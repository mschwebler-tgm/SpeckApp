<template>
    <div>
        {{ calendar }}
        <RouterView />
        <CalendarActions />
    </div>
</template>

<script>
import CalendarActions from '@calendar/components/calendar/CalendarActions';
import Calendar from '@domain-models/module/calendar/Calendar';
import calendarRepository from '@calendar/services/CalendarRepository';

export default {
    name: 'Calendar',
    components: { CalendarActions },
    props: {
        calendarId: {
            type: String,
            required: true,
        },
        propCalendar: {
            type: Calendar,
            required: false,
        },
    },
    data() {
        return {
            calendar: this.propCalendar,
        };
    },
    created() {
        if (!this.calendar) {
            this.fetchCalendar();
        }
    },
    methods: {
        fetchCalendar() {
            calendarRepository.getById(this.calendarId);
        },
    },
};
</script>
