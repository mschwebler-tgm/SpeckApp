import { inject, injectable } from 'inversify';
import IEventRepository from '@calendar/repositories/IEventRepository';
import CalendarService from '@calendar/services/CalendarService';
import CreateEventRequest from '@models/module/requests/CreateEventRequest';
import Event from '@models/module/domain-models/calendar/event/Event';
import iocBindings from '@shared/ioc/iocBindings';
import ListEventsRequest from '@models/module/requests/ListEventsRequest';

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

    async listEvents(listEventsRequest: ListEventsRequest): Promise<Event[]> {
        const calendar = await this.calenderService.getById(listEventsRequest.calendarId, listEventsRequest.userId);
        return this.eventRepository.getForCalendar(
            calendar.id,
            listEventsRequest.getFromTimestamp(),
            listEventsRequest.getToTimestamp(),
        );
    }
}
