import {
    Body, Controller, Post, Request, Route, Tags,
} from 'tsoa';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Event from '@domain-models/module/calendar/event/Event';
import CreateEventRequest from '@calendar/controllers/requests/CreateEventRequest';
import { transformAndValidateSync } from 'class-transformer-validator';
import iocContainer from '@shared/ioc/iocContainer';
import iocBindings from '@shared/ioc/iocBindings';
import EventService from '@calendar/services/EventService';

@Tags('Event')
@Route('event')
export class EventController extends Controller {
    @Post('')
    public async create(
        @Request() request: APIGatewayProxyEvent,
        @Body() body: CreateEventRequest,
    ): Promise<Event> {
        const createEventRequest = transformAndValidateSync(CreateEventRequest, body);
        const userId = request.requestContext.authorizer.claims.sub;
        const eventService: EventService = iocContainer.get(iocBindings.EventService);
        return eventService.createEvent(createEventRequest, userId);
    }
}
