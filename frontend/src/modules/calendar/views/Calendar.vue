<template>
  <div class="h-100">
    <BaseEmptyState
        :icon="icons.CALENDAR"
        headline="Create your first calendar"
        text="You can create a personal or shared calendar to collaborate with your friends and family."
    >
      <VBtn color="primary" :to="{name: 'calendar-create'}">Create Calendar</VBtn>
    </BaseEmptyState>
    <RouterView/>
    <CalendarActions/>
  </div>
</template>

<script>
import CalendarActions from "@calendar/components/CalendarActions";
import BaseEmptyState from "@/base-components/base-empty-state/BaseEmptyState";
import {iconsMixin} from "@calendar/config/icons";
import Vue from "vue";

export default Vue.extend({
  name: "Calendar",
  mixins: [iconsMixin],
  components: {BaseEmptyState, CalendarActions},
  created() {
    this.$store.dispatch('calendar/fetchCalendars');
  },
});
</script>

<style scoped>

</style>