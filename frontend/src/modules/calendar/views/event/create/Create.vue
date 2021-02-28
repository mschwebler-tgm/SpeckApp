<template>
  <BaseFormOverlay :value="true">
    <EventForm v-model="event"/>
  </BaseFormOverlay>
</template>

<script>
import BaseFormOverlay from "@/base-components/base-form-overlay/BaseFormOverlay";
import EventForm from "@calendar/components/event/EventForm";

export default {
  name: "Create",
  components: {EventForm, BaseFormOverlay},
  data() {
    return {
      event: {
        name: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      },
    }
  },
}
</script>
