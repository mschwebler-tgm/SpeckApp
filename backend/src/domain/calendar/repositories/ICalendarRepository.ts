import {Calendar} from "../domain-models/Calendar";

export default interface ICalendarRepository {

    create(calendar: Calendar): Promise<Calendar>;

}