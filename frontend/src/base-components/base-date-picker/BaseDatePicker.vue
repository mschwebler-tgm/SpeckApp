<template>
    <VDialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
    >
        <template v-slot:activator="{ on }">
            <div v-on="on" class="d-flex align-center pt-3 pb-3">
                <span>
                    {{ date }}
                </span>
            </div>
        </template>
        <VDatePicker
            v-model="date"
            scrollable
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
                @click="$refs.dialog.save(date)"
            >
                Ok
            </VBtn>
        </VDatePicker>
    </VDialog>
</template>

<script>
export default {
    name: 'BaseDatePicker',
    props: {
        value: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            date: this.value || new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
        };
    },
    watch: {
        value(date) {
            this.date = date;
        },
        date(date) {
            this.$emit('input', date);
        },
    },
};
</script>
