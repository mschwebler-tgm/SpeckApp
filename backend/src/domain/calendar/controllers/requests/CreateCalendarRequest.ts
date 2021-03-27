import { IsEnum, Length } from 'class-validator';
import { plainToClass } from 'class-transformer';
import Calendar, { CalendarType } from '@models/module/domain-models/calendar/Calendar';

export default class CreateCalendarRequest {
    @Length(3, 50)
    name: string;

    @IsEnum(CalendarType)
    type: CalendarType;

    toDomainModel(): Calendar {
        return plainToClass(Calendar, this);
    }
}

export interface ICreateCalendarRequest extends CreateCalendarRequest {

}
