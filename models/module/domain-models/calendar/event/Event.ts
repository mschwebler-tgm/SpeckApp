/* eslint-disable no-unused-vars */
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

    interval: EventRecurrenceInterval;
}

// eslint-disable-next-line no-shadow
export enum EventRecurrenceInterval {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    YEARLY = 'yearly',
}

export class EventNotification {
    notifyOnCreate: EventNotificationConfig;

    notifyOnStart: EventNotificationConfig;
}

export class EventNotificationConfig {
    enabled: boolean;
}

export interface IEvent extends Event {

}
