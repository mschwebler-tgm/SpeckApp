/* eslint-disable no-unused-vars,no-extra-semi,semi */

import Calendar from '@models/module/domain-models/calendar/Calendar';

export default interface ICalendarRepository {

    create(calendar: Calendar): Promise<Calendar>;

    findMultiple(calendarIds: string[]): Promise<Calendar[]>;

    find(calendarId: string): Promise<Calendar>;

    save(calendar: Calendar): Promise<void>;
};
