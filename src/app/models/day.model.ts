import { IEvent } from './day-event';

export interface IDay {
  date: Date;
  events: Array<IEvent>;
  isToday?: boolean;
}
