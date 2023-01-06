import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEvent } from '../models/day-event';
import { EventService } from '../services/event/event.service';
import { interval } from 'rxjs';
import { getDateString, isToday } from '../utils/date';

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

  ngOnInit(): void {
    for (let i = 0; i < 25; i++) {
      this.hours.push(
        i.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) + ':00'
      );
    }
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

  ngAfterViewInit() {
    this.currentTimeRef.nativeElement.scrollIntoView();
  }

  getDate = () => {
    return this.date.toLocaleDateString('de-De');
  };

  onPreviousDay = () => {
    const previousDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() - 1
    );
    this.router.navigate(['day/' + getDateString(previousDay)]);
  };

  onNextDay = () => {
    const nextDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate() + 1
    );
    this.router.navigate(['day/' + getDateString(nextDay)]);
  };

  isCurrentDay(): boolean {
    return true;
    return isToday(this.date);
  }

  getTimeOffset(): string {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes() + 'px';
  }

  getCurrentTime(): string {
    const now = new Date();
    return (
      now.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ':' +
      now.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
  }
}
