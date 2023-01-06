import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { IEvent } from '../models/event.model';
import { getDateString } from '../utils/date';

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

  /**
   * Gets the id of the event to edit from the url.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadEvent(id);
  }

  /**
   * Makes the request to the service to get the event,
   * in case the event does not exist, redirects the user
   * to the current day.
   *
   * @param id The id of the event to be editted.
   */
  loadEvent(id: string): void {
    this.EventService.get(id).subscribe(
      (event: IEvent) => {
        this.event = event;
      },
      () => this.redirect(new Date())
    );
  }

  /**
   * Handles the updating of the event.
   */
  onUpdate() {
    if (this.event.name.trim().length > 0) {
      this.EventService.update(this.event).subscribe(() => {
        this.redirect(this.event.startDate.toDate());
      });
    }
  }

  /**
   * Handles the canceling of the event, which is redirecting the user
   * to the view of the day of the event.
   */
  onCancel() {
    this.redirect(this.event.startDate.toDate());
  }

  /**
   * Handles the deleting of the event, and redirects the user
   * to the view of the day of the event.
   */
  onDelete() {
    this.EventService.delete(this.event.id).subscribe(() => {
      this.redirect(this.event.startDate.toDate());
    });
  }

  /**
   * Redirects the user to the view of a specific day.
   *
   * @param date The date to which to redirect the user.
   */
  redirect(date: Date): void {
    this.router.navigate(['day/' + getDateString(date)]);
  }
}
