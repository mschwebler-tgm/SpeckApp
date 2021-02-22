import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '@/routes';
import Amplify from "aws-amplify";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) {
        next();
    }
    console.log('[NavigationGuard] Checking auth state...');
    try {
        await Amplify.Auth.currentAuthenticatedUser();
        console.log('[NavigationGuard] Success.');
        next();
    } catch (e) {
        console.log('[NavigationGuard] Error. Redirecting to auth');
        next({name: 'auth'});
    }
});

export default router;
