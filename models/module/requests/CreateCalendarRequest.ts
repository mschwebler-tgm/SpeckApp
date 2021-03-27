import { plainToClass } from 'class-transformer';
import { IsEnum, Length } from 'class-validator';
import Calendar, { CalendarType } from '@models/module/domain-models/calendar/Calendar';

export default class CreateCalendarRequest {
    @Length(3, 50)
    name: string = '';

    @IsEnum(CalendarType)
    type: CalendarType = CalendarType.PRIVATE_CALENDAR;

    toDomainModel(): Calendar {
        return plainToClass(Calendar, this);
    }
}

export interface ICreateCalendarRequest extends CreateCalendarRequest {

}
