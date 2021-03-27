import { inject, injectable } from 'inversify';
import IUserRepository from '@calendar/repositories/IUserRepository';
import User from '@calendar/domain-models/User';
import DomainError from '@shared/errors/DomainError';
import Calendar from '@models/module/domain-models/calendar/Calendar';
import iocBindings from '../../../shared/ioc/iocBindings';
import ICalendarRepository from '../repositories/ICalendarRepository';

@injectable()
export default class CalendarService {
    private readonly calendarRepository: ICalendarRepository;

    private readonly userRepository: IUserRepository;

    constructor(
        @inject(iocBindings.CalendarRepositoryFactory) calendarRepositoryFactory: () => ICalendarRepository,
        @inject(iocBindings.UserRepositoryFactory) userRepositoryFactory: () => IUserRepository,
    ) {
        this.calendarRepository = calendarRepositoryFactory();
        this.userRepository = userRepositoryFactory();
    }

    async createCalendar(calendar: Calendar, userId: string): Promise<Calendar> {
        calendar.ownerId = userId;
        await this.calendarRepository.create(calendar);
        await this.addCalendarToUser(userId, calendar.id);

        return calendar;
    }

    private async addCalendarToUser(userId, calendarId): Promise<void> {
        const user: User = await this.userRepository.findOrCreateByCognitoId(userId);
        user.calendarIds.push(calendarId);
        await this.userRepository.save(user);
    }

    async getAllCalendars(userId: string): Promise<Calendar[]> {
        console.log('get user');
        const user = await this.userRepository.findOrCreateByCognitoId(userId);
        console.log(user);
        return this.calendarRepository.findMultiple(user.calendarIds);
    }

    async getById(calendarId: string, userId: string): Promise<Calendar> {
        const user = await this.userRepository.findOrCreateByCognitoId(userId);
        if (!user.calendarIds.includes(calendarId)) {
            throw new DomainError('You don\' have access to this calendar.', 403);
        }
        return this.calendarRepository.find(calendarId);
    }

    async save(calendar: Calendar): Promise<void> {
        await this.calendarRepository.save(calendar);
    }
}
