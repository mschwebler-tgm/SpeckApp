import {injectable} from "inversify";
import ICalendarRepository from "../ICalendarRepository";
import {Calendar} from "../../domain-models/Calendar";

@injectable()
export default class DynamoCalendarRepository implements ICalendarRepository {

    async save(calendar: Calendar): Promise<Calendar> {
        console.log('saving to dynamo...');
        return calendar;
    }

}
