<template>
    <div id="speck-app" v-if="$root.user">
        <AppBar @show-nav="showNavigationDrawer = true"/>
        <NavigationDrawer v-model="showNavigationDrawer"/>

        <!-- Sizes content based upon application components -->
        <VMain class="h-100">
            <!-- Provides the application the proper gutter -->
            <VContainer fluid class="h-100">
                <RouterView/>
            </VContainer>
        </VMain>

        <BottomNavigation />
    </div>
</template>

<script>
import NavigationDrawer from '@/views/speck-app/NavigationDrawer';
import AppBar from '@/views/speck-app/AppBar';
import BottomNavigation from '@/views/speck-app/BottomNavigation';

export default {
    components: { BottomNavigation, AppBar, NavigationDrawer },
    data() {
        return {
            showNavigationDrawer: false,
        };
    },
};
</script>

<style lang="scss">
  @import "~@/scss/views/speckApp.scss";
</style>
