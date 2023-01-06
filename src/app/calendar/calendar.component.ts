import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from '../models/event.model';
import { IDay } from '../models/day.model';
import { EventService } from '../services/event/event.service';
import {
  getDateString,
  getMonthString,
  getNextMonth,
  getNumberOfDays,
  getPreviousMonth,
  isSameDay,
  isToday,
  weekdays,
} from '../utils/date';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  rows = 6;
  spacers: Array<IDay> = [];
  days: Array<IDay> = [];
  fillers: Array<IDay> = [];
  oldDate = new Date('1999-04-22');
  date = new Date();

  constructor(private EventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.handleDateChange();
  }

  /**
   * Creates an array of days, with the events, of a given date.
   *
   * @param date The date/month of which to get the days
   * @returns An array consisting of the days of the month
   *  with all the events of the days.
   */
  getDays = (date: Date): Array<IDay> => {
    const days: Array<IDay> = [];
    for (let i = 1; i <= getNumberOfDays(date); i++) {
      const day = {
        date: new Date(date.getFullYear(), date.getMonth(), i),
        events: [],
      } as IDay;
      if (isToday(day.date)) day.isToday = true;
      days.push(day);
    }
    // Add the events to the day
    this.EventService.getOfMonth(date).subscribe((events: Array<IEvent>) => {
      events.forEach((event: IEvent) => {
        const day = days.find((day: IDay) =>
          isSameDay(event.startDate.toDate(), day.date)
        );
        day?.events.push(event);
      });
    });
    return days;
  };

  /**
   * @returns The formatted string of the current date.
   */
  getMonth = () => {
    return getMonthString(this.date);
  };

  /**
   * @returns The year of the current date.
   */
  getYear = () => {
    return this.date.getFullYear();
  };

  /**
   * Handles the change to the previous month
   */
  onPreviousMonth = () => {
    this.date = getPreviousMonth(this.date);
    this.handleDateChange();
  };

  /**
   * Handles the change to the next month
   */
  onNextMonth = () => {
    this.date = getNextMonth(this.date);
    this.handleDateChange();
  };

  /**
   * Handles the change to an other month.
   * Genereates the spacers an fillers to align the days of
   * the current month properly.
   */
  handleDateChange = () => {
    const days = this.getDays(this.date);
    let firstDay = days[0];
    const numberOfSpacers =
      firstDay.date.getDay() === 0 ? 6 : firstDay.date.getDay() - 1;
    if (numberOfSpacers === 0) {
      this.spacers = [];
    } else {
      const previousMonth = getPreviousMonth(this.date);
      this.spacers = this.getDays(previousMonth).slice(-numberOfSpacers);
    }
    this.days = days;
    const nextMonth = getNextMonth(this.date);
    const numberOfFillers =
      this.rows * 7 - (this.spacers.length + this.days.length);
    this.fillers = this.getDays(nextMonth).slice(0, numberOfFillers);
  };

  /**
   * Navigates the user to the clicked day.
   * @param day The day which was clicked.
   */
  onDayClick(day: IDay) {
    this.router.navigate(['day/' + getDateString(day.date)]);
  }

  /**
   * @returns An array containing the 7 days of the week.
   */
  getWeekdays(): Array<string> {
    return weekdays;
  }
}
