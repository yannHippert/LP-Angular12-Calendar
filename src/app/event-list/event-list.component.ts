import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IEvent } from '../models/day-event';
import { IDay } from '../models/day.model';
import { EventService } from '../services/event/event.service';
import {
  getLongDateString,
  getTimeString,
  isSameDay,
  isToday,
} from '../utils/date';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  days: Array<IDay> = [];

  @ViewChild('todayElem', { read: ElementRef }) todayElemRef!: ElementRef;

  constructor(private EventService: EventService) {}

  ngOnInit(): void {
    this.EventService.getAll().subscribe((events: Array<IEvent>) => {
      let hasToday = false;
      let day: undefined | IDay = undefined;
      events.forEach((event: IEvent) => {
        if (
          day === undefined ||
          !isSameDay(day.date, event.startDate.toDate())
        ) {
          if (day !== undefined) this.days.push(day);

          if (!hasToday) hasToday = isToday(event.startDate.toDate());
          day = {
            date: event.startDate.toDate(),
            events: [event],
          };
        } else {
          day.events.push(event);
        }
      });
      if (day !== undefined) this.days.push(day);

      if (!hasToday) {
        this.days.push({
          date: new Date(),
          events: [],
        });

        this.days.sort(
          (a: IDay, b: IDay) => a.date.getTime() - b.date.getTime()
        );
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.todayElemRef);
    //this.todayElem.nativeElement.scrollIntoView();
  }

  getLongDateString(date: Date): string {
    return getLongDateString(date);
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  getTime(event: IEvent): string {
    return `${getTimeString(event.startDate.toDate())} - ${getTimeString(
      event.endDate.toDate()
    )}`;
  }
}
