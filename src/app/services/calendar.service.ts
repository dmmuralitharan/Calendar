import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { monthDate } from '../models/monthDate';
import { event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
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

  monthDates: monthDate[] = [];
  days: string[] = ['Sun', 'Mon', 'The', 'Wed', 'Thu', 'Fri', 'Sat'];

  private monthDatesSource = new BehaviorSubject<monthDate[]>([]);
  monthDates$: Observable<monthDate[]> = this.monthDatesSource.asObservable();

  date: Date = new Date();
  currentDate = this.date.getDate();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();

  private API_URL = 'http://localhost:3000';
  events: event[] = [];
 
  constructor(private http: HttpClient) {}

  getEvents(): Observable<event[]> {
    return this.http.get<event[]>(`${this.API_URL}/batch`);
  }

  fetchEvents(): void {
    this.getEvents().subscribe((data: event[]) => {
      this.events = [...data]; 
    });
  }

  getStoredEvents(): any[] {
    return this.events;
  }

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
    this.monthDatesSource.next(this.monthDates);
  }

  renderCalendarView(): void {
    this.monthDates = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(this.currentYear, this.currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    for (let x = firstDay.getDay(); x > 0; x--) {
      this.monthDates.push({
        date: this.createDateFromDMY(
          `${this.currentYear}-${this.currentMonth}-${prevLastDayDate - x + 1}`
        ),
        isPastMonthDay: true,
        isCurrentMonthDay: false,
        isNextMonthDay: false,
      });
    }

    for (let i = 1; i <= lastDayDate; i++) {
      if (
        i === new Date().getDate() &&
        this.currentMonth === new Date().getMonth() &&
        this.currentYear === new Date().getFullYear()
      ) {
        this.monthDates.push({
          date: this.createDateFromDMY(
            `${this.currentYear}-${this.currentMonth + 1}-${i}`
          ),
          isPastMonthDay: false,
          isCurrentMonthDay: true,
          isNextMonthDay: false,
        });
      } else {
        this.monthDates.push({
          date: this.createDateFromDMY(
            `${this.currentYear}-${this.currentMonth + 1}-${i}`
          ),
          isPastMonthDay: false,
          isCurrentMonthDay: true,
          isNextMonthDay: false,
        });
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      this.monthDates.push({
        date: this.createDateFromDMY(
          `${this.currentYear}-${this.currentMonth + 2}-${j}`
        ),
        isPastMonthDay: false,
        isCurrentMonthDay: false,
        isNextMonthDay: true,
      });
    }
  }

  createDateFromDMY(dateString: any): Date {
    let _parts = dateString.split('-');
    let _year = _parts[0];
    let _month = _parts[1];
    let _day = _parts[2];
    _day = _day.padStart(2, '0');
    _month = _month.padStart(2, '0');
    return new Date(_year, _month - 1, _day);
  }

  getEventsByDay(day: Date) {
    let filteredevents: event[] = this.events.filter((event) => {
      return day >= new Date(event.start_date) && day <= new Date(event.end_date);
    });
    return filteredevents;
  }

  ifEventStart(monthDate: Date, eventStartDate: Date): boolean {
    eventStartDate = new Date(eventStartDate)
    return (
      monthDate.getFullYear() === eventStartDate.getFullYear() &&
      monthDate.getMonth() === eventStartDate.getMonth() &&
      monthDate.getDate() === eventStartDate.getDate()
    );
  }

  ifEventEnd(monthDate: Date, eventEndDate: Date): boolean {
    console.log(eventEndDate);
    eventEndDate = new Date(eventEndDate)
    return (
      monthDate.getFullYear() === eventEndDate.getFullYear() &&
      monthDate.getMonth() === eventEndDate.getMonth() &&
      monthDate.getDate() === eventEndDate.getDate()
    );
  }

  eventTitle(monthDate: Date, eventStartDate: Date) {
    return(
      monthDate.getDate() == new Date(eventStartDate).getDate()
    )
  }
}
