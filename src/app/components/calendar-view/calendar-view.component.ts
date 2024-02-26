import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';
import { event } from '../../models/event';
import { monthDate } from '../../models/monthDate';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent {
  monthYearTitle: string = '';
  days: string[] = [];
  monthDates: monthDate[] = [];

  constructor(private _calendar: CalendarService) {
    this._calendar.changeCurrentMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;

    this.days = this._calendar.days;
    this._calendar.monthDates$.subscribe((monthDate) => {
      this.monthDates = monthDate;
    });

    console.log(this.monthDates);
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

  getEventsByDay(day: Date) {
    return this._calendar.getEventsByDay(day)
  }

  ifEventStart(monthDate: Date, eventStartDate: Date): boolean {
    return this._calendar.ifEventStart(monthDate, eventStartDate)
  }

  ifEventEnd(monthDate: Date, eventEndDate: Date): boolean {
    return this._calendar.ifEventEnd(monthDate, eventEndDate)
  }

  events$: Observable<any> = this._calendar.getEvents();
}
