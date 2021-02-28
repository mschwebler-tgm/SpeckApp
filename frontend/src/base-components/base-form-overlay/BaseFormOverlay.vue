<template>
  <VBottomSheet
      fullscreen
      :value="showOverlay"
  >
    <VSheet class="h-100">
      <VToolbar dense>
        <VToolbarTitle>
          {{ title }}
        </VToolbarTitle>

        <VSpacer></VSpacer>

        <VBtn icon @click="$router.back()">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>

      <VAlert v-if="errorMessage" type="error" tile>
        {{ errorMessage }}
      </VAlert>

      <VContainer fluid>
        <slot/>
      </VContainer>
    </VSheet>
  </VBottomSheet>
</template>

<script>
export default {
  name: "BaseFormOverlay",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    closeTargetRoute: {
      type: [String, Object],
      default: 'app-calendar',
    }
  },
  data() {
    return {
      showOverlay: this.value,
    }
  },
  watch: {
    value(showOverlay) {
      this.showOverlay = showOverlay;
    },
    showOverlay(showOverlay) {
      this.$emit('input', showOverlay);
    },
  },
  computed: {
    title() {
      return this.$router.currentRoute.meta.overlayTitle;
    },
  },
}
</script>

<style scoped>

</style>