import {inject, injectable} from "inversify";
import {Calendar} from "../domain-models/Calendar";
import ICalendarRepository from "../repositories/ICalendarRepository";
import iocBindings from "../../../shared/ioc/iocBindings";
import IUserRepository from "@calendar/repositories/IUserRepository";
import User from "@calendar/domain-models/User";

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

    private async addCalendarToUser(userId, calendarId) {
        const user: User = await this.userRepository.findOrCreate(userId);
        user.calendarIds.push(calendarId);
        await this.userRepository.save(user);
    }
}
