<template>
    <div class="home">
        <img alt="Speck App logo" src="../../assets/logo.webp" class="logo">
        <BaseButton color="primary" :to="{name: 'speck-app-root'}">
            To App
        </BaseButton>
    </div>
</template>

<script>
import BaseButton from '@/base-components/base-button/BaseButton';

export default {
    name: 'Home',
    components: { BaseButton },
};
</script>

<style lang="scss">
@import "~@/scss/views/home.scss";
</style>
