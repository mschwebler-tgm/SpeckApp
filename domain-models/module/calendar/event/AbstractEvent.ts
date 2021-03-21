export default abstract class AbstractEvent {
    id: string;

    name: string;

    type: 'event' | 'reminder' | 'encryptedEvent' | 'reminder_deadline';
}
