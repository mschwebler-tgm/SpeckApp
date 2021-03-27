import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { injectable } from 'inversify';
import uuid4 from '@shared/helpers/uuid4';
import { plainToClass } from 'class-transformer';
import Calendar from '@models/module/domain-models/calendar/Calendar';
import ICalendarRepository from '../ICalendarRepository';

@injectable()
export default class DynamoCalendarRepository implements ICalendarRepository {
    private readonly dynamoClient: DocumentClient;

    private readonly tableName: string;

    constructor(dynamoClient: DocumentClient, tableName: string) {
        this.dynamoClient = dynamoClient;
        this.tableName = tableName;
    }

    async create(calendar: Calendar): Promise<Calendar> {
        calendar.id = `calendar:${uuid4()}`;

        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: calendar,
        }).promise();

        return calendar;
    }

    async findMultiple(calendarIds: string[]): Promise<Calendar[]> {
        if (calendarIds.length === 0) {
            return [];
        }
        console.log(JSON.stringify({
            RequestItems: {
                [this.tableName]: {
                    Keys: calendarIds.map((id) => ({ id })),
                },
            },
        }));

        const batchGetResult = await this.dynamoClient.batchGet({
            RequestItems: {
                [this.tableName]: {
                    Keys: calendarIds.map((id) => ({ id })),
                },
            },
        }).promise();

        return plainToClass(Calendar, batchGetResult.Responses[this.tableName]);
    }

    async find(calendarId: string, attributesToGet: Array<keyof Calendar> = []): Promise<Calendar> {
        const getItemInput: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: {
                id: calendarId,
            },
        };
        if (attributesToGet.length > 0) {
            getItemInput.ProjectionExpression = attributesToGet.join(',');
        }

        const getResult = await this.dynamoClient.get(getItemInput).promise();

        return plainToClass(Calendar, getResult.Item);
    }

    async save(calendar: Calendar): Promise<void> {
        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: calendar,
        }).promise();
    }
}
