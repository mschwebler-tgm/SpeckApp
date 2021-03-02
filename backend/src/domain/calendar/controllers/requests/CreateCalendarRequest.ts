import { IsEnum, Length } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Calendar, CalendarType } from '@domain-models/module/calendar/Calendar';

export class CreateCalendarRequest {
    @Length(3, 50)
    name: string;

    @IsEnum(CalendarType)
    type: CalendarType;

    toDomainModel(): Calendar {
        return plainToClass(Calendar, this);
    }
}
