import {inject, injectable} from "inversify";
import {Calendar} from "../domain-models/Calendar";
import ICalendarRepository from "../repositories/ICalendarRepository";
import iocBindings from "../../../shared/ioc/iocBindings";

@injectable()
export default class CalendarService {

    @inject(iocBindings.CalendarRepository) private calendarRepository: ICalendarRepository;

    async createCalendar(calendar: Calendar, userId: string) {
        calendar.ownerId = userId;
        return this.calendarRepository.save(calendar);
    }
}
