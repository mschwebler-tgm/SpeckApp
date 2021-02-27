import {requestService} from "@/services/request-service/RequestService";

export default class CalendarRepository {
    async create(calendar: any) {  // TODO share request classes from backend with frontend
        return requestService.post('/calendar', calendar);
    }

    async getById() {
        const response = await requestService.get('/calendar/1');
        console.log(response);
    }
}

export const calendarRepository = new CalendarRepository();
