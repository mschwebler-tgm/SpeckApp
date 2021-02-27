export const icons = {
    CALENDAR: 'mdi-calendar-blank-outline',
    EVENT: 'mdi-calendar',
}

export const iconsMixin = {
    computed: {
        icons() {
            return icons;
        },
    },
}
