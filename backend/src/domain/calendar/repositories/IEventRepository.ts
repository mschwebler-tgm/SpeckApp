/* eslint-disable no-unused-vars,no-extra-semi,semi */
import Event from '../../../../../models/module/domain-models/calendar/event/Event';

export default interface IEventRepository {

    create(event: Event): Promise<Event>;

};
