import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../models/day-event';
import { Router } from '@angular/router';
import { getTimeString, isSameDay } from '../utils/date';

@Component({
  selector: 'app-day-event',
  templateUrl: './day-event.component.html',
  styleUrls: ['./day-event.component.scss'],
})
export class DayEventComponent implements OnInit {
  @Input() event!: IEvent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.event.duration = this.getDuration();
    this.event.isAllDay = this.isAllDay();
  }

  getTopOffset(): string {
    const date = this.event.startDate.toDate();
    return date.getHours() * 60 + date.getMinutes() + 12 + 'px';
  }

  getDuration(): number {
    return (this.event.endDate.seconds - this.event.startDate.seconds) / 60;
  }

  getHeight(): string {
    return this.getDuration() + 'px';
  }

  onClick(): void {
    this.router.navigate(['event/edit/' + this.event.id]);
  }

  isAllDay(): boolean {
    const startDate = this.event.startDate.toDate();
    const endDate = this.event.endDate.toDate();
    return (
      isSameDay(startDate, endDate) &&
      getTimeString(startDate) === '00:00' &&
      getTimeString(endDate) === '23:59'
    );
  }
}
