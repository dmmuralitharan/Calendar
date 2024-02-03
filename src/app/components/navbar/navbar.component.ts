import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  monthYearTitle: string = '';

  constructor(private _calendar: CalendarService) {
    this._calendar.changeCurrentMonth();
    this.monthYearTitle = this._calendar.monthYearTitle;
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
}
