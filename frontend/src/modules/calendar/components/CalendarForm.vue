<template>
  <VForm
      v-model="isValid"
      ref="form"
      @submit.prevent="submit"
  >
    <BaseTextField
        v-model="calendar.name"
        :rules="rules.name"
        label="Name"
        outlined
    />
    <BaseSelect
        v-model="calendar.type"
        :items="calendarTypes"
        :rules="rules.type"
        item-text="text"
        item-value="value"
        label="Type"
        outlined
    />
    <VSpacer/>
    <VBtn type="submit" color="primary" :loading="loading">
      Submit
    </VBtn>
  </VForm>
</template>

<script>
import BaseTextField from "@/base-components/base-text-field/BaseTextField";
import BaseSelect from "@/base-components/base-select/BaseSelect";
export default {
  name: "CalendarForm",
  components: {BaseSelect, BaseTextField},
  props: {
    value: {
      type: Object,
      default: () => ({
        name: null,
        type: null,
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isValid: false,
      calendar: this.value,
      calendarTypes: [
        {value: 'private', text: 'Private'},
        {value: 'shared', text: 'Shared'},
      ],
      rules: {
        name: [
          value => {
            if (!value) {
              return 'Calendar name is required';
            }
            if (value.length < 3) {
              return 'Calendar name has to be longer than 2 characters';
            }
            return true;
          },
        ],
        type: [
          v => !!v || 'Calendar type is required',
        ],
      }
    }
  },
  watch: {
    value(calendar) {
      this.calendar = calendar;
    },
    calendar(calendar) {
      this.$emit('input', calendar);
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.isValid) {
        this.$emit('submit');
      }
    }
  },
}
</script>
