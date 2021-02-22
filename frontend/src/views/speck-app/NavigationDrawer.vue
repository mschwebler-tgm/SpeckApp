<template>
  <VNavigationDrawer
      v-model="show"
      absolute
      temporary
      app
  >
    <VListItem>
      <VListItemAvatar>
        <VImg src="https://randomuser.me/api/portraits/men/78.jpg"></VImg>
      </VListItemAvatar>

      <VListItemContent>
        <VListItemTitle>{{ $root.user.username }}</VListItemTitle>
      </VListItemContent>
    </VListItem>

    <VDivider></VDivider>

    <VList dense>
      <VListItem
          v-for="item in items"
          :key="item.title"
          link
      >
        <VListItemIcon>
          <VIcon>{{ item.icon }}</VIcon>
        </VListItemIcon>

        <VListItemContent>
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItemContent>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      items: [
        {title: 'Calendar', icon: 'mdi-calendar'},
        {title: 'Einkaufen', icon: 'mdi-cart-outline'},
      ],
    }
  },
  watch: {
    value(show) {
      this.show = show;
    },
    show(show) {
      this.$emit('input', show);
    }
  }
}
</script>

<style scoped>

</style>