<template>
    <BaseFormOverlay :value="true">
        <EventForm v-model="event" @submit="create"/>
    </BaseFormOverlay>
</template>

<script>
import BaseFormOverlay from '@/base-components/base-form-overlay/BaseFormOverlay';
import EventForm from '@calendar/components/event/EventForm';
import eventRepository from '@calendar/services/EventRepository';

export default {
    name: 'Create',
    components: { EventForm, BaseFormOverlay },
    data() {
        return {
            isLoading: true,
            event: {
                name: null,
                startDate: {
                    date: null,
                    time: null,
                },
                endDate: {
                    date: null,
                    time: null,
                },
                recurrent: {
                    enabled: false,
                    interval: 'daily',
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
