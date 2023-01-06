import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDay } from '../models/day.model';
import {
  getMonthString,
  getNextMonth,
  getNumberOfDays,
  getPreviousMonth,
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.handleDateChange();
  }

  getFirstDay = (year: number, month: number) => {
    return new Date(year, month, 1);
  };

  getDays = (date: Date): Array<IDay> => {
    const days = [];
    for (let i = 1; i <= getNumberOfDays(date); i++) {
      const day = {
        date: new Date(date.getFullYear(), date.getMonth(), i),
        events: [],
      } as IDay;
      if (isToday(day.date)) day.isToday = true;
      days.push(day);
    }
    return days;
  };

  getMonth = () => {
    return getMonthString(this.date);
  };

  getYear = () => {
    return this.date.getFullYear();
  };

  onDateChange = (dateString: string) => {
    this.date = new Date(dateString);
    if (
      this.oldDate.getFullYear() === this.date.getFullYear() &&
      this.oldDate.getMonth() === this.date.getMonth()
    ) {
      return;
    }
    this.oldDate = this.date;
    this.handleDateChange();
  };

  onPreviousMonth = () => {
    this.date = getPreviousMonth(this.date);
    this.handleDateChange();
  };

  onNextMonth = () => {
    this.date = getNextMonth(this.date);
    this.handleDateChange();
  };

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

  onDayClick(day: IDay) {
    this.router.navigate(['day/' + day.date.toLocaleDateString('fr-CA')]);
  }

  getWeekdays(): Array<string> {
    return weekdays;
  }
}
