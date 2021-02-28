export default {
    setCalendars(state: any, calendars: any) {
        state.calendars = calendars;
    },
    setActiveCalendar(state: any, calendar: any) {
        state.activeCalendar = calendar;
    },
    setLoadingStates(state: any, loadingStates: { [key: string]: boolean }) {
        Object.assign(state.loadingStates, loadingStates);
    },
}
