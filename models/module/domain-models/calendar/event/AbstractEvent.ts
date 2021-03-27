export default abstract class AbstractEvent {
    id: string;

    startTimestamp: number;

    name: string;

    ownerId: string;

    type: 'event' | 'reminder' | 'encryptedEvent' | 'reminder_deadline';
}
