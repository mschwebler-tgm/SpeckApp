import { addMinutes, format } from 'date-fns';

export const DEFAULT_START_DATE = format(new Date(), 'yyyy-MM-dd');
export const DEFAULT_START_TIME = format(addMinutes(new Date(), 60), 'HH:mm');
export const DEFAULT_END_DATE = format(new Date(), 'yyyy-MM-dd');
export const DEFAULT_END_TIME = format(addMinutes(new Date(), 90), 'HH:mm');
