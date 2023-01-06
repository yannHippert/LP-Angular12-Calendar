import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEvent } from '../models/event.model';
import { EventService } from '../services/event/event.service';
import { interval } from 'rxjs';
import {
  getDateString,
  getTimeSlots,
  getTimeString,
  isToday,
} from '../utils/date';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  date!: Date;
  events: Array<IEvent> = [];
  hours: Array<string> = [];
  currentTime!: string;

  @ViewChild('currentTimeElement', { static: false })
  currentTimeRef!: ElementRef;

  constructor(
    private EventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Handles the initial creation of the component.
   * Creates the background, handles the parameter (which is the date),
   * and the current-time indicator.
   */
  ngOnInit(): void {
    this.hours = getTimeSlots();

    this.route.params.subscribe((params) => {
      this.date = params.date === 'today' ? new Date() : new Date(params.date);
      if (isNaN(this.date.getTime()))
        this.router.navigate(['day/' + getDateString(new Date())]);
      this.EventService.getOfDate(this.date).subscribe((events: Array<any>) => {
        this.events = events;
      });
    });

    this.currentTime = this.getCurrentTime();
    interval(1000).subscribe(() => {
      this.currentTime = this.getCurrentTime();
    });
  }

  /**
   * Scroll to the cuurent-time indicator once the component has loaded.
   */
  ngAfterViewInit() {
    this.currentTimeRef.nativeElement.scrollIntoView();
  }

  /**
   * @returns The formatted date.
   */
  getDate = (): string => {
    return this.date.toLocaleDateString('de-De');
  };

  /**
   * Handles the change to the previous day.
   */
  onPreviousDay = () => {
    const previousDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() - 1
    );
    this.router.navigate(['day/' + getDateString(previousDay)]);
  };

  /**
   * Handles the change to the next day.
   */
  onNextDay = () => {
    const nextDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + 1
    );
    this.router.navigate(['day/' + getDateString(nextDay)]);
  };

  /**
   * @returns A string consiting of the amount of pixels,
   *  the current-time indicator has to be from the top.
   */
  getTimeOffset(): string {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes() + 'px';
  }

  /**
   * @returns A string of the current time.
   */
  getCurrentTime(): string {
    return getTimeString(new Date());
  }
}
