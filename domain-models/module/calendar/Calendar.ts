// eslint-disable-next-line no-shadow
export enum CalendarType {
    // eslint-disable-next-line no-unused-vars
    PRIVATE_CALENDAR = 'private',
    // eslint-disable-next-line no-unused-vars
    SHARED_CALENDAR = 'shared',
}

export class Calendar {
    id?: string;

    type: CalendarType;

    name: string;

    ownerId?: string;
}
