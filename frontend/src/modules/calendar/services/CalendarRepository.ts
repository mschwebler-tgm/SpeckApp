import {requestService} from "@/services/request-service/RequestService";

class CalendarRepository {
    async create(calendar: any) {  // TODO share request classes from backend with frontend
        return requestService.post('/calendar', calendar);
    }

    async getById() {
        const response = await requestService.get('/calendar/1');
        console.log(response);
    }

    async listCalendars() {
        return requestService.get('/calendar');
    }
}

export const calendarRepository = new CalendarRepository();
