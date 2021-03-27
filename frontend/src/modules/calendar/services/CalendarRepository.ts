import requestService from '@/services/request-service/RequestService';
import { plainToClass } from 'class-transformer';
import Calendar from '@models/module/domain-models/calendar/Calendar';

class CalendarRepository {
    async create(calendar: Calendar): Promise<Calendar> {
        const createdCalendar = await requestService.post('/calendar', calendar);
        return plainToClass(Calendar, createdCalendar);
    }

    async listCalendars(): Promise<Calendar[]> {
        const calendars: unknown[] = await requestService.get('/calendar');
        return plainToClass(Calendar, calendars);
    }

    async getById(calendarId: String) {
        const createdCalendar = await requestService.get(`/calendar/${calendarId}`);
        return plainToClass(Calendar, createdCalendar);
    }
}

const calendarRepository = new CalendarRepository();

export default calendarRepository;
