import {
    Body, Controller, Get, Path, Post, Request, Route, Tags,
} from 'tsoa';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { transformAndValidateSync } from 'class-transformer-validator';
import iocBindings from '@shared/ioc/iocBindings';
import iocContainer from '@shared/ioc/iocContainer';
import CalendarService from '@calendar/services/CalendarService';
import Calendar from '@models/module/domain-models/calendar/Calendar';
import CreateCalendarRequest from '@models/module/requests/CreateCalendarRequest';
import EventService from '@calendar/services/EventService';
import Event from '@models/module/domain-models/calendar/event/Event';
import { plainToClass } from 'class-transformer';
import ListEventsRequest from '@models/module/requests/ListEventsRequest';

@Tags('Calendar')
@Route('calendar')
export class CalendarController extends Controller {
    @Get('')
    public async list(
        @Request() request: APIGatewayProxyEvent,
    ): Promise<Calendar[]> {
        const userId = request.requestContext.authorizer.claims.sub;
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);

        return calendarService.getAllCalendars(userId);
    }

    @Get('{id}')
    public async getById(
        @Path('id') calendarId: string,
        @Request() request: APIGatewayProxyEvent,
    ): Promise<Calendar> {
        const userId = request.requestContext.authorizer.claims.sub;
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);

        return calendarService.getById(calendarId, userId);
    }

    @Post('')
    public async create(
        @Request() request: APIGatewayProxyEvent,
        @Body() body: CreateCalendarRequest,
    ): Promise<Calendar> {
        const createCalendarRequest = transformAndValidateSync(CreateCalendarRequest, body);
        const userId = request.requestContext.authorizer.claims.sub;
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);
        return calendarService.createCalendar(createCalendarRequest.toDomainModel(), userId);
    }

    @Get('{id}/events')
    public async events(
        @Request() request: APIGatewayProxyEvent,
        @Path('id') calendarId: string,
    ): Promise<Event[]> {
        const userId = request.requestContext.authorizer.claims.sub;
        const listEventsRequest = plainToClass(ListEventsRequest, { calendarId, userId });
        const eventService: EventService = iocContainer.get(iocBindings.EventService);

        return eventService.listEvents(listEventsRequest);
    }
}
