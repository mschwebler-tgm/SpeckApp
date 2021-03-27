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
import eventRepository from '@calendar/services/EventRepository';

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
            events: [],
        };
    },
    created() {
        if (!this.calendar) {
            this.fetchCalendar();
        }
        this.fetchEvents();
    },
    methods: {
        async fetchCalendar() {
            this.calendar = await calendarRepository.getById(this.calendarId);
        },
        async fetchEvents() {
            this.events = await eventRepository.getByCalendarId(this.calendarId);
        },
    },
};
</script>
