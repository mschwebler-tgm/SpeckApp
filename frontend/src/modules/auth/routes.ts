import { RouteConfig } from 'vue-router/types/router';
import Auth from '@/modules/auth/views/Auth.vue';

export const authRoutes: RouteConfig[] = [
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
];
