import {
    Body, Controller, Get, Path, Post, Request, Route, Tags,
} from 'tsoa';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { transformAndValidateSync } from 'class-transformer-validator';
import iocBindings from '@shared/ioc/iocBindings';
import iocContainer from '@shared/ioc/iocContainer';
import CalendarService from '@calendar/services/CalendarService';
import CreateCalendarRequest from '@calendar/controllers/requests/CreateCalendarRequest';
import Calendar from '@models/module/domain-models/calendar/Calendar';

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
        console.log(`Creating calendar for user "${userId}": `, JSON.stringify(createCalendarRequest));
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);
        return calendarService.createCalendar(createCalendarRequest.toDomainModel(), userId);
    }
}
