import requestService from '@/services/request-service/RequestService';
import { plainToClass } from 'class-transformer';
import Event from '../../../../../models/module/domain-models/calendar/event/Event';

class EventRepository {
    async create(event: Event): Promise<Event> {
        const createdCalendar = requestService.post('/event', event); // bla
        return plainToClass(Event, createdCalendar);
    }
}

const eventRepository = new EventRepository();

export default eventRepository;
