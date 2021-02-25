import {Calendar} from "../domain-models/Calendar";

export default interface ICalendarRepository {

    save(calendar: Calendar): Promise<Calendar>;

}