<template>
  <VBottomNavigation app>
    <VBtn :to="{name: 'app-shopping-list'}">
      <span>Shopping List</span>

      <VIcon>mdi-cart-outline</VIcon>
    </VBtn>

    <VBtn :to="{name: 'app-calendar'}">
      <span>Calendar</span>

      <VIcon>mdi-calendar</VIcon>
    </VBtn>
  </VBottomNavigation>
</template>

<script>
export default {
name: "BottomNavigation"
}
</script>

<style scoped>

</style>