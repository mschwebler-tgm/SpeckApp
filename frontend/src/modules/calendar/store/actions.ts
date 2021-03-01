import {calendarRepository} from "@calendar/services/CalendarRepository";
import {ActionTree} from "vuex";
import {CalendarStoreState} from "@calendar/store/state";

const actions: ActionTree<CalendarStoreState, CalendarStoreState> = {
    async fetchCalendars({commit}) {
        commit('setLoadingStates', {calendars: true});
        const calendars = await calendarRepository.listCalendars();
        commit('setCalendars', calendars);
        commit('setLoadingStates', {calendars: false});
    }
};

export default actions;
