<template>
  <BaseFormOverlay :value="true">
    <CalendarForm
        v-model="calendar"
        @submit="create"
        :loading="isLoading"
    />
  </BaseFormOverlay>
</template>

<script>
import CalendarForm from "@calendar/components/CalendarForm";
import {calendarRepository} from "@calendar/services/CalendarRepository";
import BaseFormOverlay from "@/base-components/base-form-overlay/BaseFormOverlay";

export default {
  name: "Create",
  components: {BaseFormOverlay, CalendarForm},
  data() {
    return {
      calendar: {
        name: null,
        type: null,
      },
      isLoading: false,
      errorMessage: null,
    }
  },
  methods: {
    async create() {
      this.isLoading = true;
      try {
        await calendarRepository.create(this.calendar);
        this.$store.dispatch("calendar/fetchCalendars");
        return this.$router.push({name: 'app-calendar'});
      } catch (error) {
        this.errorMessage = error.response.message;
      }
      this.isLoading = false;
    },
  },
}
</script>
