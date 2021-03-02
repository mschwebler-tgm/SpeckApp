import { requestService } from '@/services/request-service/RequestService';
import { plainToClass } from 'class-transformer';
import { Calendar } from '@domain-models/module/calendar/Calendar';

class CalendarRepository {
    async create(calendar: Calendar): Promise<Calendar> {
        const createdCalendar = requestService.post('/calendar', calendar);
        return plainToClass(Calendar, createdCalendar);
    }

    async listCalendars(): Promise<Calendar[]> {
        const calendars: unknown[] = await requestService.get('/calendar');
        return plainToClass(Calendar, calendars);
    }
}

export const calendarRepository = new CalendarRepository();
