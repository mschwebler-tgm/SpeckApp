import 'reflect-metadata';
import {Container} from 'inversify';
import {registerCalendarBindings} from "../../domain/calendar/registerIocBindings";

const iocContainer = new Container();

registerCalendarBindings(iocContainer);

export default iocContainer;
