<template>
    <div class="h-100">
        <VOverlay :value="calendarsLoading">
            <VProgressCircular
                indeterminate
                size="64"
            />
        </VOverlay>
        <BaseEmptyState
            v-if="!calendarsLoading && calendars.length === 0"
            :icon="icons.CALENDAR"
            headline="Create your first calendar"
            text="You can create a personal or shared calendar to collaborate with your friends and family."
        >
            <BaseButton color="primary" :to="{name: 'calendar-create'}">Create Calendar</BaseButton>
        </BaseEmptyState>
        <CalendarSelector
            v-else
            @change="navigateToCalendar"
        />
        {{ $store.getters['calendar/activeCalendar'] }}
        <RouterView :prop-calendar="currentCalendar" />
    </div>
</template>

<script>
import BaseEmptyState from '@/base-components/base-empty-state/BaseEmptyState';
import { iconsMixin } from '@calendar/config/icons';
import Vue from 'vue';
import CalendarSelector from '@calendar/components/calendar/CalendarSelector';
import BaseButton from '@/base-components/base-button/BaseButton';

export default Vue.extend({
    name: 'CalendarOverview',
    mixins: [iconsMixin],
    components: { BaseButton, CalendarSelector, BaseEmptyState },
    data() {
        return {
            currentCalendar: null,
        };
    },
    created() {
        this.$store.dispatch('calendar/fetchCalendars');
    },
    computed: {
        calendarsLoading() {
            return this.$store.getters['calendar/calendarsLoading'];
        },
        calendars() {
            return this.$store.getters['calendar/calendars'];
        },
    },
    methods: {
        navigateToCalendar(calendar) {
            this.currentCalendar = calendar;
            const currentRoute = this.$router.currentRoute;
            const calendarRouteMatched = currentRoute.matched.some((route) => route.name === 'calendar');
            if (calendarRouteMatched && currentRoute.params.calendarId === calendar.id) {
                return;
            }
            this.$router.push({ name: 'calendar', params: { calendarId: calendar.id } });
        },
    },
});
</script>
