import { Component, Input, OnInit } from '@angular/core';
import { IBaseEvent, IEvent } from '../models/day-event';
import {
  getDateString,
  getTimestamp,
  getTimeString,
  isAllDay,
} from '../utils/date';

@Component({
  selector: 'app-event-mod',
  templateUrl: './event-mod.component.html',
  styleUrls: ['./event-mod.component.scss'],
})
export class EventModComponent implements OnInit {
  @Input() event!: IBaseEvent;
  allDay: boolean = false;
  startDateString: string = '';
  startTimeString: string = '';
  endTimeString: string = '';

  constructor() {}

  ngOnInit(): void {
    const startDate = this.event.startDate.toDate();
    const endDate = this.event.endDate.toDate();
    this.updateDateStrings(startDate, endDate);
    this.allDay = isAllDay(startDate, endDate);
  }

  isValidName() {
    return this.event.name.trim().length === 0;
  }

  onAllDayChange() {
    const newStart = this.event.startDate.toDate() as Date;
    const newEnd = this.event.startDate.toDate() as Date;
    if (this.allDay) {
      newStart.setHours(0);
      newStart.setMinutes(0);
      newEnd.setHours(23);
      newEnd.setMinutes(59);
    } else {
      const now = new Date();
      newStart.setHours(now.getHours() + 1);
      newEnd.setHours(now.getHours() + 2);
      newEnd.setMinutes(0);
    }
    this.event.startDate = getTimestamp(newStart);
    this.event.endDate = getTimestamp(newEnd);

    this.updateDateStrings(newStart, newEnd);
  }

  updateDateStrings(startDate: Date, endDate: Date): void {
    this.startDateString = getDateString(startDate);
    this.startTimeString = getTimeString(startDate);
    this.endTimeString = getTimeString(endDate);
  }

  getStartDate(): Date {
    return new Date(this.startDateString + ' ' + this.startTimeString);
  }

  getEndDate(): Date {
    return new Date(this.startDateString + ' ' + this.endTimeString);
  }

  onDateChange(): void {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();
    const startMins = startDate.getHours() * 60 + startDate.getMinutes();
    const endMins = endDate.getHours() * 60 + endDate.getMinutes();

    if (startMins >= endMins) {
      endDate.setHours(Math.min(startDate.getHours() + 1, 23));
      endDate.setMinutes(startDate.getHours() === 23 ? 59 : 0);
    }

    this.event.startDate = getTimestamp(startDate);
    this.event.endDate = getTimestamp(endDate);
    this.updateDateStrings(startDate, endDate);
  }
}
