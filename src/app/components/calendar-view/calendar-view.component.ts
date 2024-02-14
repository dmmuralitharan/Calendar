import { Component } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent {
  monthYearTitle: string = '';
  
  days: string[] = []
  currentMonthDates: number[] = [];
  previousMonthDates: number[] = [];
  nextMonthDates: number[] = [];

  constructor(private _calendar: CalendarService) {
    this._calendar.changeCurrentMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;
    
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

  events$: Observable<any> = this._calendar.getEvents()

}
