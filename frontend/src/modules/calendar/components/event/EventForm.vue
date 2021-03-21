<template>
    <VForm
        v-model="isValid"
        ref="form"
        @submit.prevent="submit"
    >
        <BaseTextField
            v-model="event.name"
            :rules="rules.name"
            label="Name"
        />
        <VDivider/>

        <!-- date & time -->
        <div class="d-flex mt-3 mb-3">
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
                    <VSwitch v-model="event.allDay" hide-details class="mt-0"/>
                </div>

                <div class="d-flex justify-space-between">
                    <BaseDatePicker v-model="event.startDate.date"/>
                    <div class="mr-2" v-if="!event.allDay">
                        <BaseTimePicker v-model="event.startDate.time"/>
                    </div>
                </div>
                <div class="d-flex justify-space-between">
                    <BaseDatePicker v-model="event.endDate.date"/>
                    <div class="mr-2" v-if="!event.allDay">
                        <BaseTimePicker v-model="event.endDate.time"/>
                    </div>
                </div>
            </div>
        </div>

        <VDivider/>

        <div class="ml-2 mr-2">
            <VCheckbox
                v-model="event.recurrent.enabled"
                label="Recurrent event"
            />
            <VExpandTransition>
                <BaseSelect
                    v-show="event.recurrent.enabled"
                    v-model="event.recurrent.interval"
                    :items="recurrentIntervalItems"
                    item-text="label"
                    item-value="value"
                />
            </VExpandTransition>
        </div>

        <VDivider/>

        <div class="ml-2 mr-2">
            <VCheckbox
                v-model="event.notification.notifyOnStart.enabled"
                hide-details
                label="Notify members on event start"
                off-icon="mdi-bell"
                on-icon="mdi-bell-ring"
            />
            <VCheckbox
                v-model="event.notification.notifyOnCreate.enabled"
                label="Notify members of created event"
                off-icon="mdi-bell"
                on-icon="mdi-bell-ring"
            />
        </div>

        <VDivider/>

        <!-- color -->
        <BaseColorPicker />

        <BaseButton type="submit" color="primary" :loading="loading">
            {{ saveButtonText }}
        </BaseButton>
    </VForm>
</template>

<script>
import BaseTextField from '@/base-components/base-text-field/BaseTextField';
import BaseDatePicker from '@/base-components/base-date-picker/BaseDatePicker';
import BaseTimePicker from '@/base-components/base-time-picker/BaseTimePicker';
import BaseColorPicker from '@/base-components/base-color-picker/BaseColorPicker';
import BaseButton from '@/base-components/base-button/BaseButton';
import BaseSelect from '@/base-components/base-select/BaseSelect';

export default {
    name: 'EventForm',
    components: {
        BaseSelect,
        BaseButton,
        BaseColorPicker,
        BaseTimePicker,
        BaseDatePicker,
        BaseTextField,
    },
    props: {
        value: {
            type: Object,
            default: () => ({
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
                notification: {
                    notifyOnStart: {
                        enabled: true,
                    },
                    notifyOnCreate: {
                        enabled: false,
                    },
                },
            }),
        },
        saveButtonText: {
            type: String,
            default: 'Save',
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isValid: false,
            event: this.value,
            rules: {
                name: [
                    (v) => !!v || 'Event name is required',
                ],
                type: [
                    (v) => !!v || 'Calendar type is required',
                ],
            },
            recurrentIntervalItems: [
                { value: 'daily', label: 'Every Day' },
                { value: 'weekly', label: 'Every Week' },
                { value: 'monthly', label: 'Every Month' },
                { value: 'yearly', label: 'Every Year' },
            ],
        };
    },
    watch: {
        value(event) {
            this.event = event;
        },
        event(event) {
            this.$emit('input', event);
        },
    },
    methods: {
        submit() {
            this.$refs.form.validate();
            if (this.isValid) {
                this.$emit('submit');
            }
        },
    },
};
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
