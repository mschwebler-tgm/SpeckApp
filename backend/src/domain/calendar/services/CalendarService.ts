import {injectable} from "inversify";
import {Calendar} from "../domain-models/Calendar";
import ICalendarRepository from "../repositories/ICalendarRepository";

@injectable()
export default class CalendarService {

    private calendarRepository: ICalendarRepository;

    async createCalendar(calendar: Calendar) {
        return this.calendarRepository.save(calendar);
    }
}
