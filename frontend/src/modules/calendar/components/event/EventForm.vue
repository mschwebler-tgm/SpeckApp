<template>
  <div>
    <BaseTextField
        v-model="event.name"
        :rules="rules.name"
        label="Name"
    />
    <VDivider/>

    <!-- date & time -->
    <div class="d-flex mt-3">
      <div class="clock-icon">
        <VIcon>
          mdi-clock-time-four-outline
        </VIcon>
      </div>
      <div class="flex-grow-1">
        <div class="d-flex">
          <div class="flex-grow-1 all-day-label">
            <span>
              All-day
            </span>
          </div>
          <VSwitch :value="false" hide-details class="mt-0"/>
        </div>

        <div class="d-flex justify-space-between">
          <BaseDatePicker v-model="event.startDate"/>
          <div class="mr-2">
            <BaseTimePicker v-model="event.startTime"/>
          </div>
        </div>
        <div class="d-flex justify-space-between">
          <BaseDatePicker v-model="event.endDate"/>
          <div class="mr-2">
            <BaseTimePicker v-model="event.endTime"/>
          </div>
        </div>
      </div>
    </div>

    <VDivider/>

    <!-- color -->
    <BaseColorPicker />
  </div>
</template>

<script>
import BaseTextField from "@/base-components/base-text-field/BaseTextField";
import BaseDatePicker from "@/base-components/base-date-picker/BaseDatePicker";
import BaseTimePicker from "@/base-components/base-time-picker/BaseTimePicker";
import BaseColorPicker from "@/base-components/base-color-picker/BaseColorPicker";

export default {
  name: "EventForm",
  components: {BaseColorPicker, BaseTimePicker, BaseDatePicker, BaseTextField},
  props: {
    value: {
      type: Object,
      default: () => ({
        name: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
      }),
    },
  },
  data() {
    return {
      event: this.value,
      rules: {
        name: [
          v => !!v || 'Event name is required',
        ],
        type: [
          v => !!v || 'Calendar type is required',
        ],
      }

    }
  },
  watch: {
    value(event) {
      this.event = event;
    },
    event(event) {
      this.$emit('input', event);
    },
  },
}
</script>

<style scoped lang="scss">
$clock-icon-size: 40px;

.clock-icon {
  height: $clock-icon-size;
  width: $clock-icon-size;
  display: flex;
  align-items: center;
  justify-content: center;
}

.all-day-label {
  display: flex;
  align-items: center;
  height: $clock-icon-size;
}
</style>