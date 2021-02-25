import {Body, Controller, Get, Path, Post, Request, Route, Tags} from "tsoa";
import {CreateCalendarRequest} from "./requests/CreateCalendarRequest";
import {Calendar} from "../domain-models/Calendar";
import iocBindings from "../../../shared/ioc/iocBindings";
import CalendarService from "../services/CalendarService";
import {APIGatewayProxyEvent} from "aws-lambda";
import iocContainer from "../../../shared/ioc/iocContainer";
import {plainToClass} from "class-transformer";

@Tags('Calendar')
@Route('calendar')
export class BookController extends Controller {

    @Get('{id}')
    public async getBook(
        @Path() id: string,
    ): Promise<object> {
        return {id};
    }

    @Post('')
    public async create(
        @Request() request: APIGatewayProxyEvent,
        @Body() body: unknown,
    ): Promise<Calendar> {
        const createCalendarRequest = plainToClass(CreateCalendarRequest, body);
        const userId = request.requestContext.authorizer.claims.sub;
        console.log(`Creating calendar for user "${userId}": `, JSON.stringify(createCalendarRequest));
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);
        return await calendarService.createCalendar(createCalendarRequest.toDomainModel(), userId);
    }

}
