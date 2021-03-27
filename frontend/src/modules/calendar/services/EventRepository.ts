import requestService from '@/services/request-service/RequestService';
import { plainToClass } from 'class-transformer';
import Event from '../../../../../models/module/domain-models/calendar/event/Event';

class EventRepository {
    async create(event: Event): Promise<Event> {
        const createdCalendar = await requestService.post('/event', event); // bla
        return plainToClass(Event, createdCalendar);
    }

    async getByCalendarId(calendarId: string): Promise<Event[]> {
        const events: unknown[] = await requestService.get(`/calendar/${calendarId}/events`);
        return plainToClass(Event, events);
    }
}

const eventRepository = new EventRepository();

export default eventRepository;
