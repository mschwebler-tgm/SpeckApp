<template>
  <VDialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="color"
      persistent
      width="290px"
  >
    <template v-slot:activator="{ on }">
      <div v-on="on" class="d-flex align-center pt-3 pb-3">
        <div class="circle" :style="colorIndicatorStyle"></div>
        {{ currentColorLabel }}
      </div>
    </template>
    <VColorPicker
        v-model="color"
        mode="hexa"
        show-swatches
    >
    </VColorPicker>
    <VCardActions>
      <VSpacer />
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
          @click="$refs.dialog.save(color)"
      >
        Ok
      </VBtn>
    </VCardActions>
  </VDialog>
</template>

<script>
export default {
  name: "BaseColorPicker",
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      color: this.value,
      menu: false,
      modal: false,
    }
  },
  watch: {
    value(color) {
      this.color = color;
    },
    color(color) {
      this.$emit('input', color);
    },
  },
  computed: {
    currentColorLabel() {
      if (!this.currentColorCode) {
        return 'Color';
      }
      return this.currentColorCode;
    },
    currentColorCode() {
      if (this.color && this.color.hex) {
        return this.color.hex;
      }
      return null;
    },
    colorIndicatorStyle() {
      return {
        backgroundColor: this.currentColorCode,
      };
    }
  },
}
</script>

<style scoped lang="scss">
  .circle {
    border-radius: 100%;
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    margin: 9px;
  }
</style>