<template>
    <VBottomNavigation app>
        <VBtn :to="{name: 'app-shopping-list'}">
            <span>Shopping List</span>

            <VIcon>mdi-cart-outline</VIcon>
        </VBtn>

        <VBtn :to="{name: 'app-calendar'}">
            <span>Calendar</span>

            <VIcon>{{ icons.CALENDAR }}</VIcon>
        </VBtn>
    </VBottomNavigation>
</template>

<script>
import Vue from 'vue';
import { iconsMixin } from '@calendar/config/icons';

export default Vue.extend({
    name: 'BottomNavigation',
    mixins: [iconsMixin],
});
</script>

<style scoped>

</style>
