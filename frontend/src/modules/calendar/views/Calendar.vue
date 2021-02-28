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
      <VBtn color="primary" :to="{name: 'calendar-create'}">Create Calendar</VBtn>
    </BaseEmptyState>
    <CalendarSelector v-else/>
    {{ $store.getters['calendar/activeCalendar'] }}
    <RouterView/>
    <CalendarActions/>
  </div>
</template>

<script>
import CalendarActions from "@calendar/components/CalendarActions";
import BaseEmptyState from "@/base-components/base-empty-state/BaseEmptyState";
import {iconsMixin} from "@calendar/config/icons";
import Vue from "vue";
import CalendarSelector from "@calendar/components/CalendarSelector";

export default Vue.extend({
  name: "Calendar",
  mixins: [iconsMixin],
  components: {CalendarSelector, BaseEmptyState, CalendarActions},
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
});
</script>

<style scoped>

</style>