import {calendarRepository} from "@calendar/services/CalendarRepository";

export default {
    // @ts-ignore
    async fetchCalendars({commit}) {
        commit('setLoadingStates', {calendars: true});
        const calendars = await calendarRepository.listCalendars();
        commit('setCalendars', calendars);
        commit('setLoadingStates', {calendars: false});
    }
};
