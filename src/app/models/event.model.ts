import firebase from 'firebase/app';

export interface IBaseEvent {
  name: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
  duration?: number;
  isAllDay?: boolean;
  color?: string;
}

export interface IEvent extends IBaseEvent {
  id: string;
}
