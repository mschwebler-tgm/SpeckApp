import { MutationTree } from 'vuex';
import { CalendarStoreState } from '@calendar/store/state';

const mutations: MutationTree<CalendarStoreState> = {
    setCalendars(state, calendars) {
        state.calendars = calendars;
    },
    setActiveCalendar(state, calendar) {
        state.activeCalendar = calendar;
    },
    setLoadingStates(state, loadingStates: { [key: string]: boolean }) {
        Object.assign(state.loadingStates, loadingStates);
    },
};

export default mutations;
