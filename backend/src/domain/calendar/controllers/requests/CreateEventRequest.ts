import {
    IsBoolean, IsDefined, IsEnum, IsHexColor, IsOptional, IsString, Length, ValidateNested,
} from 'class-validator';
import { plainToClass } from 'class-transformer';
import Event, { EventRecurrenceInterval } from '../../../../../../models/module/domain-models/calendar/event/Event';

/**
 * @tsoaModel
 */
export default class CreateEventRequest {
    @IsString()
    targetCalendarId: string;

    @Length(1, 50)
    name: string;

    @IsOptional()
    description?: string;

    ownerId: string;

    @ValidateNested()
    startDate: EventDateRequest;

    @ValidateNested()
    endDate: EventDateRequest;

    @IsBoolean()
    allDay: boolean;

    @ValidateNested()
    recurrence: EventRecurrenceRequest;

    @ValidateNested()
    notification: EventNotificationRequest;

    @IsOptional()
    @IsHexColor()
    color?: string;

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
    enabled: boolean;

    @IsEnum(EventRecurrenceInterval)
    interval: EventRecurrenceInterval;
}

class EventNotificationRequest {
    @ValidateNested()
    notifyOnCreate: EventNotificationConfigRequest;

    @ValidateNested()
    notifyOnStart: EventNotificationConfigRequest;
}

class EventNotificationConfigRequest {
    @IsBoolean()
    enabled: boolean;
}
