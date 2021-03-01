import {Calendar} from "@domain-models/module/calendar/Calendar";

export type CalendarStoreState = {
    calendars: Calendar[],
    activeCalendar: Calendar | null,
    loadingStates: { [key: string]: boolean },
};

const state: CalendarStoreState = {
    calendars: [],
    activeCalendar: null,
    loadingStates: {
        calendars: false,
    },
}

export default state;
