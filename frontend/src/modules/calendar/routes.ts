import {RouteConfig} from "vue-router/types/router";
import Calendar from "@calendar/views/Calendar.vue";
import CreateCalendar from "@calendar/views/create/Create.vue";
import CreateEvent from "@calendar/views/event/create/Create.vue";

export const calendarRoutes: RouteConfig[] = [
    {
        path: 'calendar',
        name: 'app-calendar',
        component: Calendar,
        children: [
            {
                path: 'create',
                name: 'calendar-create',
                component: CreateCalendar,
                meta: {
                    overlayTitle: 'Create Calendar',
                },
            },
            {
                path: 'event/create',
                name: 'calendar-event-create',
                component: CreateEvent,
                meta: {
                    overlayTitle: 'Create Event',
                },
            },
        ],
    },
];
