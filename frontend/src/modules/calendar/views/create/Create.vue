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
      Bla
    </VSheet>
  </VBottomSheet>
</template>

<script>
export default {
name: "Create"
}
</script>

<style scoped>

</style>