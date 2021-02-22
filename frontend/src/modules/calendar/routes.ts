import {RouteConfig} from "vue-router/types/router";
import Calendar from "@calendar/views/Calendar.vue";

export const calendarRoutes: RouteConfig[] = [
    {
        path: 'calendar',
        name: 'app-calendar',
        component: Calendar,
    },
];
