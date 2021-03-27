import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { injectable } from 'inversify';
import uuid4 from '@shared/helpers/uuid4';
import IEventRepository from '@calendar/repositories/IEventRepository';
import { plainToClass } from 'class-transformer';
import Event from '@models/module/domain-models/calendar/event/Event';

@injectable()
export default class DynamoEventRepository implements IEventRepository {
    private readonly dynamoClient: DocumentClient;

    private readonly tableName: string;

    constructor(dynamoClient: DocumentClient, tableName: string) {
        this.dynamoClient = dynamoClient;
        this.tableName = tableName;
    }

    async create(event: Event): Promise<Event> {
        event.id = `event:${uuid4()}`;
        event.startTimestamp = new Date(Date.parse(`${event.startDate.date} ${event.startDate.time}`)).valueOf();

        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: event,
        }).promise();

        return event;
    }

    async getForCalendar(calendarId: string, fromTimestamp: number, toTimestamp: number): Promise<Event[]> {
        const events = await this.dynamoClient.query({
            TableName: this.tableName,
            KeyConditionExpression:
                'targetCalendarId = :calendarId AND startTimestamp BETWEEN :fromTimestamp AND :toTimestamp',
            ExpressionAttributeValues: {
                ':calendarId': calendarId,
                ':fromTimestamp': fromTimestamp,
                ':toTimestamp': toTimestamp,
            },
        }).promise();

        return plainToClass(Event, events.Items);
    }
}
