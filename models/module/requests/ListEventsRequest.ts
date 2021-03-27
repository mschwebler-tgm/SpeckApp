import { setYear, startOfYear, endOfYear } from 'date-fns';
import { IsNumber } from 'class-validator';

const DEFAULT_YEAR = new Date().getFullYear();

export default class ListEventsRequest {
    calendarId: string;

    userId: string;

    @IsNumber()
    year: number = DEFAULT_YEAR;

    getFromTimestamp(): number {
        const date = setYear(new Date(), this.year);
        return startOfYear(date).valueOf();
    }

    getToTimestamp(): number {
        const date = setYear(new Date(), this.year);
        return endOfYear(date).valueOf();
    }
}
