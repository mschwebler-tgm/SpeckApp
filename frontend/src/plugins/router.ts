import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '@/routes';
import {authGuard, updateUser} from "@auth/authGuard";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(authGuard);
router.afterEach(updateUser);

export default router;
