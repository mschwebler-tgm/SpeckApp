import Home from './views/public-views/Home.vue';
import SpeckApp from './views/speck-app/SpeckApp.vue';
import {RouteConfig} from "vue-router/types/router";
import {authRoutes} from '@auth/routes';

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/app',
    name: 'speck-app-root',
    meta: { requiresAuth: true },
    component: SpeckApp,
  },
  ...authRoutes,
]
