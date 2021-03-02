<template>
    <VDialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="time"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on }">
            <div v-on="on" class="d-flex align-center pt-3 pb-3">
                <span>
                    {{ time }}
                </span>
            </div>
        </template>
        <VTimePicker
            v-if="modal"
            v-model="time"
            full-width
            format="24hr"
        >
            <VSpacer></VSpacer>
            <VBtn
                text
                color="primary"
                @click="modal = false"
            >
                Cancel
            </VBtn>
            <VBtn
                text
                color="primary"
                @click="$refs.dialog.save(time)"
            >
                OK
            </VBtn>
        </VTimePicker>
    </VDialog>
</template>

<script>
export default {
    name: 'BaseTimePicker',
    props: {
        value: {
            type: String,
            default: '00:00',
        },
    },
    data() {
        return {
            time: this.value || '00:00',
            modal: false,
        };
    },
    watch: {
        value(time) {
            this.time = time;
        },
        time(time) {
            this.$emit('input', time);
        },
    },
};
</script>
