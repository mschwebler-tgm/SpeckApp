<template>
  <VSpeedDial
      v-model="showMenu"
      bottom
      right
      open-on-hover
      absolute
  >
    <template v-slot:activator>
      <VBtn
          v-model="showMenu"
          color="blue darken-2"
          dark
          fab
      >
        <VIcon v-if="showMenu">
          mdi-close
        </VIcon>
        <VIcon v-else>
          mdi-plus
        </VIcon>
      </VBtn>
    </template>
    <VBtn
        fab
        dark
        small
        color="indigo"
        :to="{name: 'calendar-create'}"
    >
      <VIcon>{{ icons.EVENT }}</VIcon>
    </VBtn>
    <VBtn
        fab
        dark
        small
        color="indigo"
        :to="{name: 'calendar-create'}"
    >
      <VIcon>{{ icons.CALENDAR }}</VIcon>
    </VBtn>
  </VSpeedDial>
</template>

<script>
import Vue from "vue";
import {iconsMixin} from "@calendar/config/icons";

export default Vue.extend({
  name: "CalendarActions",
  mixins: [iconsMixin],
  data() {
    return {
      showMenu: false,
    }
  },
});
</script>

<style scoped>

</style>