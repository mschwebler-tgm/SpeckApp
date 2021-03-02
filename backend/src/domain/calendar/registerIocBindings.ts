import { Container } from 'inversify';
import { DynamoDB } from 'aws-sdk';
import IUserRepository from '@calendar/repositories/IUserRepository';
import DynamoUserRepository from '@calendar/repositories/dynamodb/DynamoUserRepository';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import CalendarService from './services/CalendarService';
import iocBindings from '../../shared/ioc/iocBindings';
import ICalendarRepository from './repositories/ICalendarRepository';
import DynamoCalendarRepository from './repositories/dynamodb/DynamoCalendarRepository';

export const registerCalendarBindings = (iocContainer: Container) => {
    iocContainer.bind<CalendarService>(iocBindings.CalendarService).to(CalendarService);
    iocContainer.bind<ICalendarRepository>(iocBindings.CalendarRepositoryFactory).toFactory<DynamoCalendarRepository>(() => () => new DynamoCalendarRepository(new DynamoDB.DocumentClient(getDynamoOptions()), process.env.CALENDAR_DYNAMO_TABLE_NAME));
    iocContainer.bind<IUserRepository>(iocBindings.UserRepositoryFactory).toFactory<DynamoUserRepository>(() => () => new DynamoUserRepository(new DynamoDB.DocumentClient(getDynamoOptions()), process.env.CALENDAR_DYNAMO_TABLE_NAME));
};

function getDynamoOptions() {
    const options: DocumentClient.DocumentClientOptions & DynamoDB.Types.ClientConfiguration = {
        region: process.env.REGION,
    };
    if (process.env.IS_LOCAL) {
        options.endpoint = 'http://localhost:8000';
        options.accessKeyId = 'xxxxxx';
        options.secretAccessKey = 'xxxxxx';
    }
    console.log(options);
    return options;
}
