import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event/event.service';
import firebase from 'firebase/app';
import { IEvent } from '../models/day-event';
import {
  getDateString,
  getTimestamp,
  getTimeString,
  isAllDay,
  isSameDay,
} from '../utils/date';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  event!: IEvent;

  constructor(
    private EventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadEvent(id);
  }

  loadEvent(id: string): void {
    this.EventService.get(id).subscribe((event: IEvent) => {
      this.event = event;
    });
  }

  onUpdate() {
    if (this.event.name.trim().length > 0)
      this.EventService.update(this.event).subscribe(() => {
        this.redirect(this.event.startDate.toDate());
      });
  }

  onCancel() {
    this.redirect(this.event.startDate.toDate());
  }

  onReset() {
    this.loadEvent(this.event.id);
  }

  onDelete() {
    this.EventService.delete(this.event.id).subscribe(() => {
      this.redirect(this.event.startDate.toDate());
    });
  }

  redirect(date: Date): void {
    this.router.navigate(['day/' + getDateString(date)]);
  }
}
