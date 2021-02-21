import Home from '../views/Home.vue';
import SpeckApp from '../views/SpeckApp.vue';
import Auth from '../views/auth/Auth.vue';
import {RouteConfig} from "vue-router/types/router";

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
  {
    path: '/app',
    name: 'appRoot',
    meta: { requiresAuth: true },
    component: SpeckApp,
  }
]
