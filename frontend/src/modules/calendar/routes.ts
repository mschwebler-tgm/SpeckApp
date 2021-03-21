import { RouteConfig } from 'vue-router/types/router';
import CalendarOverview from '@calendar/views/CalendarOverview.vue';
import Calendar from '@calendar/views/Calendar.vue';
import CreateCalendar from '@calendar/views/create/Create.vue';
import CreateEvent from '@calendar/views/event/create/Create.vue';

const calendarRoutes: RouteConfig[] = [
    {
        path: 'calendar',
        name: 'app-calendar',
        component: CalendarOverview,
        children: [
            {
                path: ':calendarId',
                name: 'calendar',
                component: Calendar,
                props: true,
                children: [
                    {
                        path: 'event/create',
                        name: 'calendar-event-create',
                        component: CreateEvent,
                        props: true,
                        meta: {
                            overlayTitle: 'Create Event',
                        },
                    },
                ],
            },
            {
                path: 'create',
                name: 'calendar-create',
                component: CreateCalendar,
                meta: {
                    overlayTitle: 'Create Calendar',
                },
            },
        ],
    },
];

export default calendarRoutes;
