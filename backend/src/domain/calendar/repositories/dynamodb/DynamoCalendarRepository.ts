import {DocumentClient} from "aws-sdk/lib/dynamodb/document_client";
import {injectable} from "inversify";
import ICalendarRepository from "../ICalendarRepository";
import {Calendar} from "@calendar/domain-models/Calendar";
import uuid4 from "@shared/helpers/uuid4";

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

}
