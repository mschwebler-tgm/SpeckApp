import {RouteConfig} from "vue-router/types/router";
import Calendar from "@calendar/views/Calendar.vue";
import Create from "@calendar/views/create/Create.vue";

export const calendarRoutes: RouteConfig[] = [
    {
        path: 'calendar',
        name: 'app-calendar',
        component: Calendar,
        children: [
            {
                path: 'create',
                name: 'calendar-create',
                component: Create,
            }
        ],
    },
];
