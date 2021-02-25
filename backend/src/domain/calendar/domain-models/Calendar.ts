export enum CalendarType {
    PRIVATE_CALENDAR = 'private',
    SHARED_CALENDAR = 'shared',
}

export class Calendar {
    id: string;
    type: CalendarType;
    ownerId: string;
}
