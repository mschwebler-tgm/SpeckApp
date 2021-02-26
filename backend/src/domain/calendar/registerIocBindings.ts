import {Container} from "inversify";
import CalendarService from "./services/CalendarService";
import iocBindings from "../../shared/ioc/iocBindings";
import ICalendarRepository from "./repositories/ICalendarRepository";
import DynamoCalendarRepository from "./repositories/dynamodb/DynamoCalendarRepository";
import {DynamoDB} from "aws-sdk";
import IUserRepository from "@calendar/repositories/IUserRepository";
import DynamoUserRepository from "@calendar/repositories/dynamodb/DynamoUserRepository";


export const registerCalendarBindings = (iocContainer: Container) => {
    iocContainer.bind<CalendarService>(iocBindings.CalendarService).to(CalendarService);
    iocContainer.bind<ICalendarRepository>(iocBindings.CalendarRepositoryFactory).toFactory<DynamoCalendarRepository>(() => {
        return () => new DynamoCalendarRepository(new DynamoDB.DocumentClient({region: process.env.REGION}), process.env.CALENDAR_DYNAMO_TABLE_NAME)
    });
    iocContainer.bind<IUserRepository>(iocBindings.UserRepositoryFactory).toFactory<DynamoUserRepository>(() => {
        return () => new DynamoUserRepository(new DynamoDB.DocumentClient({region: process.env.REGION}), process.env.CALENDAR_DYNAMO_TABLE_NAME)
    });
}
