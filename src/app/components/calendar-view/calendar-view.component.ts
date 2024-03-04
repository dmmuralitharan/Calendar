import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { monthDate } from '../../models/monthDate';
import { event } from '../../models/event';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent implements OnInit {
  monthYearTitle: string = '';
  days: string[] = [];
  monthDates: monthDate[] = [];
  events: event[] = [];
  constructor(private _calendar: CalendarService) {}

  ngOnInit(): void {
    this._calendar.changeCurrentMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;

    this.days = this._calendar.days;
    this._calendar.monthDates$.subscribe((monthDate) => {
      this.monthDates = monthDate;
    });
    this._calendar.fetchEvents();
    this.events = this._calendar.events;
  }

  currentMonthBtn(): void {
    this._calendar.changeCurrentMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;
  }

  previousMonthBtn(): void {
    this._calendar.changePreviousMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;
  }

  nextMonthBtn(): void {
    this._calendar.changeNextMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;
  }

  getEventsByDay(monthDate: monthDate) {
    return this._calendar.getEventsByDay(monthDate);
  }

  ifEventStart(monthDate: Date, eventStartDate: Date): boolean {
    return this._calendar.ifEventStart(monthDate, eventStartDate);
  }

  ifEventEnd(monthDate: Date, eventEndDate: Date): boolean {
    return this._calendar.ifEventEnd(monthDate, eventEndDate);
  }

  eventTitle(monthDate: Date, eventStartDate: Date) {
    return this._calendar.eventTitle(monthDate, eventStartDate);
  }
}
