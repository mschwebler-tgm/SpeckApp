import Event from './event/Event';

export default class Calendar {
    id?: string;

    type: CalendarType;

    name: string;

    ownerId?: string;

    eventIds: string[] = [];

    addEvent(event: Event) {
        this.eventIds.push(event.id);
    }
}

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum CalendarType {
    PRIVATE_CALENDAR = 'private',
    SHARED_CALENDAR = 'shared',
}
