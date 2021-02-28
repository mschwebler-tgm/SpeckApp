import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {injectable} from "inversify";
import ICalendarRepository from "../ICalendarRepository";
import {Calendar} from "@calendar/domain-models/Calendar";
import uuid4 from "@shared/helpers/uuid4";
import {plainToClass} from "class-transformer";

@injectable()
export default class DynamoCalendarRepository implements ICalendarRepository {

    private readonly dynamoClient: DocumentClient;
    private readonly tableName: string;

    constructor(dynamoClient: DocumentClient, tableName: string) {
        this.dynamoClient = dynamoClient;
        this.tableName = tableName;
    }

    async create(calendar: Calendar): Promise<Calendar> {
        calendar.id = 'calendar:' + uuid4();
        console.log('creating calendar in dynamo...', JSON.stringify(calendar));

        await this.dynamoClient.put({
            TableName: this.tableName,
            Item: calendar
        }).promise();

        return calendar;
    }

    async findMultiple(calendarIds: string[]): Promise<Calendar[]> {
        const batchGetResult = await this.dynamoClient.batchGet({
            RequestItems: {
                [this.tableName]: {
                    Keys: calendarIds.map(id => ({id})),
                },
            },
        }).promise();

        return plainToClass(Calendar, batchGetResult.Responses[this.tableName]);
    }

}
