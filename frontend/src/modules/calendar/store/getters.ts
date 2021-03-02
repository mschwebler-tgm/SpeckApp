import { GetterTree } from 'vuex';
import { CalendarStoreState } from '@calendar/store/state';

const getters: GetterTree<CalendarStoreState, CalendarStoreState> = {
    calendars: (state) => state.calendars,
    activeCalendar: (state) => state.activeCalendar,
    calendarsLoading: (state) => state.loadingStates.calendars,
};

export default getters;
