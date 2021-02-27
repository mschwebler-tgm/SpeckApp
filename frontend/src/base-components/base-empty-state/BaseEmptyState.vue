<template>
  <div class="d-flex flex-column justify-center h-100">
    <div>
      <VDivider />
      <div class="mt-10 mb-10">
        <VIcon x-large class="mb-8" color="text--primary">
          {{ icon }}
        </VIcon>
        <br>
        <h2 class="headline text--primary">{{ headline }}</h2>
        <br>
        <span v-if="text" class="text--secondary">{{ text }}</span>
        <br>
        <br>
        <slot />
      </div>
      <VDivider />
    </div>
  </div>
</template>

<script>
export default {
name: "BaseEmptyState",
  props: {
    icon: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
  },
}
</script>

<style scoped>

</style>