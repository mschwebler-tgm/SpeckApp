import {Body, Controller, Get, Path, Post, Request, Route, Tags} from "tsoa";
import {CreateCalendarRequest} from "./requests/CreateCalendarRequest";
import {Calendar} from "../domain-models/Calendar";
import iocBindings from "../../../shared/ioc/iocBindings";
import CalendarService from "../services/CalendarService";
import {APIGatewayProxyEvent} from "aws-lambda";
import iocContainer from "../../../shared/ioc/iocContainer";
import {transformAndValidateSync} from "class-transformer-validator";

@Tags('Calendar')
@Route('calendar')
export class BookController extends Controller {

    @Get('{id}')
    public async getBook(
        @Path() id: string,
    ): Promise<object> {
        return {id};
    }

    @Get('')
    public async list(
        @Request() request: APIGatewayProxyEvent,
    ): Promise<Calendar[]> {
        const userId = request.requestContext.authorizer.claims.sub;
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);

        return await calendarService.getAllCalendars(userId);
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
        return await calendarService.createCalendar(createCalendarRequest.toDomainModel(), userId);
    }

}
