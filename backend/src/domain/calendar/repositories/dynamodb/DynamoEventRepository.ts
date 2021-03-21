import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { injectable } from 'inversify';
import uuid4 from '@shared/helpers/uuid4';
import IEventRepository from '@calendar/repositories/IEventRepository';
import Event from '@domain-models/module/calendar/event/Event';

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

        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: event,
        }).promise();

        return event;
    }
}
