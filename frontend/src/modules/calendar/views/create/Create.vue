<template>
    <BaseFormOverlay :value="true">
        <CalendarForm
            v-model="calendar"
            :loading="isLoading"
            @submit="create"
        />
    </BaseFormOverlay>
</template>

<script>
import CalendarForm from '@calendar/components/calendar/CalendarForm';
import calendarRepository from '@calendar/services/CalendarRepository';
import BaseFormOverlay from '@/base-components/base-form-overlay/BaseFormOverlay';
import CreateCalendarRequest from '@models/module/requests/CreateCalendarRequest';

export default {
    name: 'Create',
    components: { BaseFormOverlay, CalendarForm },
    data() {
        return {
            calendar: new CreateCalendarRequest(),
            isLoading: false,
            errorMessage: null,
        };
    },
    methods: {
        async create() {
            this.isLoading = true;
            try {
                await calendarRepository.create(this.calendar);
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
