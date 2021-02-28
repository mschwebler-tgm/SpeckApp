import {calendarRepository} from "@calendar/services/CalendarRepository";

export default {
    // @ts-ignore
    async fetchCalendars({commit}) {
        const calendars = await calendarRepository.listCalendars();
        commit('setCalendars', calendars);
    }
};
