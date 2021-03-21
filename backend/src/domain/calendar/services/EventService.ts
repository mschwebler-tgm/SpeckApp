import { inject, injectable } from 'inversify';
import IEventRepository from '@calendar/repositories/IEventRepository';
import Event from '@domain-models/module/calendar/event/Event';
import CalendarService from '@calendar/services/CalendarService';
import CreateEventRequest from '@calendar/controllers/requests/CreateEventRequest';
import iocBindings from '../../../shared/ioc/iocBindings';

@injectable()
export default class EventService {
    private readonly calenderService: CalendarService;

    private readonly eventRepository: IEventRepository;

    constructor(
        @inject(iocBindings.CalendarService) calenderService: CalendarService,
        @inject(iocBindings.EventRepositoryFactory) eventRepositoryFactory: () => IEventRepository,
    ) {
        this.calenderService = calenderService;
        this.eventRepository = eventRepositoryFactory();
    }

    async createEvent(createEventRequest: CreateEventRequest, userId: string): Promise<Event> {
        const calendar = await this.calenderService.getById(createEventRequest.targetCalendarId, userId);

        const event = await this.eventRepository.create(createEventRequest.toDomainModel());
        calendar.addEvent(event);
        await this.calenderService.save(calendar);

        return event;
    }
}
