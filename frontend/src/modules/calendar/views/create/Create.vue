<template>
  <VBottomSheet
      fullscreen
      :value="true"
  >
    <VSheet class="h-100">
      <VToolbar dense>
        <VToolbarTitle>Create Calendar</VToolbarTitle>

        <VSpacer></VSpacer>

        <VBtn icon @click="$router.back()">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VAlert v-if="errorMessage" type="error" tile>
        {{ errorMessage }}
      </VAlert>

      <VContainer fluid>
        <CalendarForm
            v-model="calendar"
            @submit="create"
            :loading="isLoading"
        />
      </VContainer>
    </VSheet>
  </VBottomSheet>
</template>

<script>
import CalendarForm from "@calendar/components/CalendarForm";
import {calendarRepository} from "@calendar/services/CalendarRepository";

export default {
  name: "Create",
  components: {CalendarForm},
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
        return this.$router.push({name: 'app-calendar'});
      } catch (error) {
        this.errorMessage = error.response.message;
      }
      this.isLoading = false;
    },
  },
}
</script>
