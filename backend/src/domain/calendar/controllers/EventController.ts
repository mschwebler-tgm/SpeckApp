import {
    Body, Controller, Post, Request, Route, Tags,
} from 'tsoa';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Event from '@domain-models/module/calendar/event/Event';
import CreateEventRequest from '@calendar/controllers/requests/CreateEventRequest';

@Tags('Event')
@Route('event')
export class EventController extends Controller {
    @Post('')
    public async create(
        @Request() request: APIGatewayProxyEvent,
        @Body() body: CreateEventRequest,
    ): Promise<Event> {
        const userId = request.requestContext.authorizer.claims.sub;
        console.log(body, userId);
        return null;
    }
}
