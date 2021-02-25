import {Body, Controller, Get, Path, Post, Request, Route, Tags} from "tsoa";
import {CreateCalendarRequest} from "./requests/CreateCalendarRequest";
import {Calendar} from "../domain-models/Calendar";
import iocBindings from "../../../shared/ioc/iocBindings";
import CalendarService from "../services/CalendarService";
import {APIGatewayProxyEvent} from "aws-lambda";
import iocContainer from "../../../shared/ioc/iocContainer";

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
        @Body() createCalendarRequest: CreateCalendarRequest,
    ): Promise<Calendar> {
        const calendarService: CalendarService = iocContainer.get(iocBindings.CalendarService);
        console.log(JSON.stringify(request.requestContext));
        return await calendarService.createCalendar(createCalendarRequest.toDomainModel());
    }

}
