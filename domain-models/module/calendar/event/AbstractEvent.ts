export default abstract class AbstractEvent {
    id: string;

    name: string;

    ownerId: string;

    type: 'event' | 'reminder' | 'encryptedEvent' | 'reminder_deadline';
}
