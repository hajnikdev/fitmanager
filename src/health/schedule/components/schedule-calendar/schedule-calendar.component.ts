import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDay: Date | null = null;
  selectedDayIndex: number | null = null;
  selectedWeek: Date | null = null;

  @Input()
  set date(date: Date | null) {
    if (date) this.selectedDay = new Date(date.getTime());
  }

  @Output() change = new EventEmitter<Date>();
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(
      new Date(this.selectedDay ?? new Date())
    );
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek ?? new Date());
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfTheWeek(new Date());
    const startDate = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate()
    );
    startDate.setDate(startDate.getDate() + weekOffset * 7);
    this.change.emit(startDate);
  }

  private getStartOfTheWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
  }

  private getToday(date: Date | null) {
    if (date) {
      let today = date?.getDay() - 1;
      if (today < 0) {
        today = 6;
      }
      return today;
    }
    return null;
  }
}
