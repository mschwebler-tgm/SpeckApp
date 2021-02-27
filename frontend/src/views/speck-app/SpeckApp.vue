<template>
  <div id="speck-app">
    <AppBar @show-nav="showNavigationDrawer = true"/>
    <NavigationDrawer v-model="showNavigationDrawer"/>

    <!-- Sizes content based upon application components -->
    <VMain>
      <!-- Provides the application the proper gutter -->
      <VContainer fluid>
        <RouterView/>
      </VContainer>
    </VMain>

    <BottomNavigation />
  </div>
</template>

<script>
import NavigationDrawer from "@/views/speck-app/NavigationDrawer";
import AppBar from "@/views/speck-app/AppBar";
import BottomNavigation from "@/views/speck-app/BottomNavigation";

export default {
  components: {BottomNavigation, AppBar, NavigationDrawer},
  data() {
    return {
      showNavigationDrawer: false,
    }
  },
}
</script>

<style lang="scss">
  @import "~@/scss/views/speckApp.scss";
</style>
