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
  </div>
</template>
<script>
import NavigationDrawer from "@/views/speck-app/NavigationDrawer";
import AppBar from "@/views/speck-app/AppBar";

export default {
  components: {AppBar, NavigationDrawer},
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