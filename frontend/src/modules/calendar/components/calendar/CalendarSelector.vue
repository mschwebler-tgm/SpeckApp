<template>
    <VSelect
        v-model="activeCalendar"
        :items="calendars"
        :disabled="onlyOneCalendarAvailable"
        item-text="name"
        return-object
        outlined
    />
</template>

<script>
export default {
    name: 'CalendarSelector',
    data() {
        return {
            activeCalendar: null,
        };
    },
    watch: {
        calendars(calendars) {
            if (calendars.length > 0) {
                this.activeCalendar = calendars[0];
            }
        },
        activeCalendar(calendar) {
            this.$store.commit('calendar/setActiveCalendar', calendar);
        },
    },
    computed: {
        calendars() {
            return this.$store.getters['calendar/calendars'];
        },
        onlyOneCalendarAvailable() {
            return this.calendars.length === 1;
        },
    },
};
</script>
