import {Container} from "inversify";
import CalendarService from "./services/CalendarService";
import iocBindings from "../../shared/ioc/iocBindings";
import ICalendarRepository from "./repositories/ICalendarRepository";
import DynamoCalendarRepository from "./repositories/dynamodb/DynamoCalendarRepository";


export const registerCalendarBindings = (iocContainer: Container) => {
    iocContainer.bind<CalendarService>(iocBindings.CalendarService).to(CalendarService);
    iocContainer.bind<ICalendarRepository>(iocBindings.CalendarRepository).to(DynamoCalendarRepository);
}
