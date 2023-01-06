import firebase from 'firebase/app';

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(today, date);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isAllDay = (startDate: Date, endDate: Date): boolean => {
  return (
    isSameDay(startDate, endDate) &&
    getTimeString(startDate) === '00:00' &&
    getTimeString(endDate) === '23:59'
  );
};

export const getNumberOfDays = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getPreviousDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
};

export const getPreviousMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
};

export const getNextDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
};

export const getNextMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

export const getDateString = (date: Date): string => {
  return date.toLocaleDateString('fr-CA');
};

export const getLongDateString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const weekday = weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1];
  const formattedDate = date.toLocaleDateString('en-DE', options);

  return `${weekday}, ${formattedDate}`;
};

export const getTimeString = (date: Date): string => {
  return (
    date.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ':' +
    date.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
};

export const getMonthString = (date: Date): string => {
  return date.toLocaleString('default', { month: 'long' });
};

export const getTimestamp = (date: Date): firebase.firestore.Timestamp => {
  return firebase.firestore.Timestamp.fromDate(date);
};

export const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
