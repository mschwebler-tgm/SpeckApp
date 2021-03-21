<template>
    <BaseFormOverlay :value="true">
        <EventForm v-model="event" @submit="create"/>
    </BaseFormOverlay>
</template>

<script>
import BaseFormOverlay from '@/base-components/base-form-overlay/BaseFormOverlay';
import EventForm from '@calendar/components/event/EventForm';
import eventRepository from '@calendar/services/EventRepository';
import {
    DEFAULT_END_DATE,
    DEFAULT_END_TIME,
    DEFAULT_START_DATE,
    DEFAULT_START_TIME,
} from '@calendar/views/event/create/config';

export default {
    name: 'Create',
    components: { EventForm, BaseFormOverlay },
    data() {
        return {
            isLoading: true,
            event: {
                name: null,
                allDay: false,
                startDate: {
                    date: DEFAULT_START_DATE,
                    time: DEFAULT_START_TIME,
                },
                endDate: {
                    date: DEFAULT_END_DATE,
                    time: DEFAULT_END_TIME,
                },
                recurrence: {
                    enabled: false,
                    interval: 'daily',
                },
                notification: {
                    notifyOnStart: {
                        enabled: true,
                    },
                    notifyOnCreate: {
                        enabled: false,
                    },
                },
            },
        };
    },
    methods: {
        async create() {
            this.isLoading = true;
            try {
                await eventRepository.create(this.event);
                this.$store.dispatch('calendar/fetchCalendars');
                await this.$router.push({ name: 'app-calendar' });
            } catch (error) {
                this.errorMessage = error.response.message;
            }
            this.isLoading = false;
        },
    },
};
</script>
