import 'reflect-metadata';
import {
    IsBoolean, IsDefined, IsEnum, IsHexColor, IsOptional, IsString, Length, ValidateIf, ValidateNested,
} from 'class-validator';
import { plainToClass, Type } from 'class-transformer';
import Event, { EventRecurrenceInterval } from '@models/module/domain-models/calendar/event/Event';
import {
    CREATE_EVENT_DEFAULT_END_DATE, CREATE_EVENT_DEFAULT_END_TIME,
    CREATE_EVENT_DEFAULT_START_DATE,
    CREATE_EVENT_DEFAULT_START_TIME,
} from './config';

/**
 * @tsoaModel
 */
export default class CreateEventRequest {
    @IsString()
    targetCalendarId: string;

    @Length(1, 50)
    name: string = '';

    @IsOptional()
    description?: string = '';

    ownerId: string = '';

    @Type(() => EventDateRequest)
    @ValidateNested()
    startDate: EventDateRequest = plainToClass(EventDateRequest, {
        date: CREATE_EVENT_DEFAULT_START_DATE,
        time: CREATE_EVENT_DEFAULT_START_TIME,
    });

    @Type(() => EventDateRequest)
    @ValidateNested()
    endDate: EventDateRequest = plainToClass(EventDateRequest, {
        date: CREATE_EVENT_DEFAULT_END_DATE,
        time: CREATE_EVENT_DEFAULT_END_TIME,
    });

    @IsBoolean()
    allDay: boolean = false;

    @Type(() => EventRecurrenceRequest)
    @ValidateNested()
    recurrence: EventRecurrenceRequest = new EventRecurrenceRequest();

    @Type(() => EventNotificationRequest)
    @ValidateNested()
    notification: EventNotificationRequest = new EventNotificationRequest();

    @ValidateIf((request) => Boolean(request.color))
    @IsHexColor()
    color?: string = '';

    toDomainModel(): Event {
        return plainToClass(Event, this);
    }
}

class EventDateRequest {
    @IsDefined()
    date: string;

    @IsOptional()
    time?: string;
}

class EventRecurrenceRequest {
    @IsBoolean()
    enabled: boolean = false;

    @IsEnum(EventRecurrenceInterval)
    interval: EventRecurrenceInterval = EventRecurrenceInterval.DAILY;
}

class EventNotificationRequest {
    @ValidateNested()
    notifyOnCreate: EventNotificationConfigRequest = new EventNotificationConfigRequest();

    @ValidateNested()
    notifyOnStart: EventNotificationConfigRequest = plainToClass(EventNotificationConfigRequest, { enabled: true });
}

class EventNotificationConfigRequest {
    @IsBoolean()
    enabled: boolean = false;
}
