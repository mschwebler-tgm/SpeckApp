<template>
  <VAppBar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('show-nav')"></v-app-bar-nav-icon>

    <VToolbarTitle class="d-flex justify-center">
      Speck App
      <img alt="Speck App logo" src="../../assets/logo.webp" width="40" class="ml-4">
    </VToolbarTitle>

    <VSpacer></VSpacer>

    <VMenu
        left
        bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <VBtn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <VIcon>mdi-dots-vertical</VIcon>
        </VBtn>
      </template>

      <VList>
        <VListItem
            @click="toggleDarkTheme"
        >
          <VListItemIcon>
            <VIcon>
              mdi-brightness-6
            </VIcon>
          </VListItemIcon>
          <VListItemTitle>Toggle dark theme</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAppBar>
</template>

<script>
export default {
name: "AppBar",
  created() {
    this.$vuetify.theme.isDark = localStorage.getItem('theme') === 'dark';
  },
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('theme', this.$vuetify.theme.isDark ? 'dark' : 'light');
    },
  },
}
</script>

<style scoped>

</style>