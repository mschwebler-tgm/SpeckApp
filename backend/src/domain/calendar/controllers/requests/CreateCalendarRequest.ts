import {Calendar, CalendarType} from "../../domain-models/Calendar";
import {IsEnum, Length} from "class-validator";
import {plainToClass} from "class-transformer";

export class CreateCalendarRequest {

    @Length(5, 50)
    name: string;

    @IsEnum(CalendarType)
    type: CalendarType;

    toDomainModel(): Calendar {
        console.log('AAAAAAAAAAAAAAAA');
        return plainToClass(Calendar, this);
    }
}
