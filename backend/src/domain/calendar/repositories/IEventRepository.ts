/* eslint-disable no-unused-vars,no-extra-semi,semi */
import Event from '@domain-models/module/calendar/event/Event';

export default interface IEventRepository {

    create(event: Event): Promise<Event>;

};
