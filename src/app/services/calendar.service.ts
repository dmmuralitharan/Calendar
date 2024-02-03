import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  // navbar
  monthYearTitle: string = '';
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  private previousMonthDateSource = new BehaviorSubject<number[]>([]);
  previousMonthDates$ = this.previousMonthDateSource.asObservable();
  private currentMonthDateSource = new BehaviorSubject<number[]>([]);
  currentMonthDates$ = this.currentMonthDateSource.asObservable();
  private nextMonthDateSource = new BehaviorSubject<number[]>([]);
  nextMonthDates$ = this.nextMonthDateSource.asObservable();

  date: Date = new Date();
  currentDate = this.date.getDate();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();

  constructor() {}

  changeCurrentMonth(): void {
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    this.renderCalendar();
  }

  changePreviousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar();
  }

  changeNextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  }

  renderCalendar(): void {
    this.renderCalendarView();
    this.monthYearTitle = `${this.months[this.currentMonth]} ${
      this.currentYear
    }`;
    this.previousMonthDateSource.next(this.previousMonthDates);
    this.currentMonthDateSource.next(this.currentMonthDates);
    this.nextMonthDateSource.next(this.nextMonthDates);
  }

  //Calendar view
  previousMonthDates: number[] = [];
  currentMonthDates: number[] = [];
  nextMonthDates: number[] = [];

  renderCalendarView(): void {
    this.previousMonthDates = [];
    this.currentMonthDates = [];
    this.nextMonthDates = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    for (let x = firstDay.getDay(); x > 0; x--) {
      this.previousMonthDates.push(prevLastDayDate - x + 1);
    }

    for (let i = 1; i <= lastDayDate; i++) {
      if (
        i === new Date().getDate() &&
        this.currentMonth === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
      ) {
        this.currentMonthDates.push(i);
      } else {
        this.currentMonthDates.push(i);
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      this.nextMonthDates.push(j);
    }
  }
}
