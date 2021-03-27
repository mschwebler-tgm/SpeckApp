import { addMinutes, format } from 'date-fns';

export const CREATE_EVENT_DEFAULT_START_DATE = format(new Date(), 'yyyy-MM-dd');
export const CREATE_EVENT_DEFAULT_START_TIME = format(addMinutes(new Date(), 60), 'HH:mm');
export const CREATE_EVENT_DEFAULT_END_DATE = format(new Date(), 'yyyy-MM-dd');
export const CREATE_EVENT_DEFAULT_END_TIME = format(addMinutes(new Date(), 90), 'HH:mm');
