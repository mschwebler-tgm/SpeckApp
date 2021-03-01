import {Calendar} from "@domain-models/module/calendar/Calendar";

export default interface ICalendarRepository {

    create(calendar: Calendar): Promise<Calendar>;

    findMultiple(calendarIds: string[]): Promise<Calendar[]>;

}