/* eslint-disable no-unused-vars,no-extra-semi,semi */
import { Calendar } from '@domain-models/module/calendar/Calendar';

export default interface ICalendarRepository {

    create(calendar: Calendar): Promise<Calendar>;

    findMultiple(calendarIds: string[]): Promise<Calendar[]>;

};
