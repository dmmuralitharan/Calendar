import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent {
  days: string[] = []
  currentMonthDates: number[] = [];
  previousMonthDates: number[] = [];
  nextMonthDates: number[] = [];

  constructor(private _calendar: CalendarService) {
    this.days = this._calendar.days;
    this._calendar.previousMonthDates$.subscribe((previousMonthDate) => {
      this.previousMonthDates = previousMonthDate;
    });
    this._calendar.currentMonthDates$.subscribe((nowMonthDate) => {
      this.currentMonthDates = nowMonthDate;
    });
    this._calendar.nextMonthDates$.subscribe((nextMonthDate) => {
      this.nextMonthDates = nextMonthDate;
    });
  }
}
