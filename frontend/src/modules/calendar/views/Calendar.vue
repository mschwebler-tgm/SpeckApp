<template>
    <div>
        {{ calendar }}
        <RouterView />
        <CalendarActions />
    </div>
</template>

<script>
import CalendarActions from '@calendar/components/calendar/CalendarActions';
import calendarRepository from '@calendar/services/CalendarRepository';
import Calendar from '@models/module/domain-models/calendar/Calendar';

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
