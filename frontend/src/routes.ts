import { RouteConfig } from 'vue-router/types/router';
import { authRoutes } from '@auth/routes';
import { calendarRoutes } from '@calendar/routes';
import SpeckApp from './views/speck-app/SpeckApp.vue';
import Home from './views/public-views/Home.vue';

export const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/app',
        name: 'speck-app-root',
        meta: { requiresAuth: true },
        component: SpeckApp,
        children: [
            ...calendarRoutes,
        ],
    },
    {
        path: '/test',
        name: 'app-shopping-list',
        redirect: { name: 'home' },
    },
    ...authRoutes,
];
