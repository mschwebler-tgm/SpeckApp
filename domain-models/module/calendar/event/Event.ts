import AbstractEvent from './AbstractEvent';

export default class Event extends AbstractEvent {
    description?: string;

    startDate: EventDateConfig;

    endDate: EventDateConfig;

    allDay: boolean;

    recurrence: EventRecurrence;

    notification: EventNotification;

    color: string;
}

export class EventDateConfig {
    date: string;

    time?: string;
}

export class EventRecurrence {
    enabled: boolean;

    interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export class EventNotification {
    notifyOnCreate: EventNotificationConfig;

    notifyOnStart: EventNotificationConfig;
}

export class EventNotificationConfig {
    enabled: boolean;

    notifyMembers: 'all' | UserIds;
}

type UserIds = string[];
