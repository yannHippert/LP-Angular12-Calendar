import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseEvent } from '../models/day-event';
import { EventService } from '../services/event/event.service';
import { getDateString, getTimestamp, getTimeString } from '../utils/date';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  event!: IBaseEvent;

  constructor(private EventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setMinutes(0);
    endDate.setMinutes(0);
    endDate.setHours(startDate.getHours() + 2);
    startDate.setHours(startDate.getHours() + 1);
    this.event = {
      name: 'New Event',
      startDate: getTimestamp(startDate),
      endDate: getTimestamp(endDate),
    };
  }

  onCreate() {
    if (this.event.name.trim().length > 0)
      this.EventService.add(this.event).subscribe(() => {
        this.router.navigate([
          'day/' + getDateString(this.event.startDate.toDate()),
        ]);
      });
  }

  onCancel() {
    this.router.navigate(['calendar']);
  }
}
