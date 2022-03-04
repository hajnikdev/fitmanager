import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

// Models
import {
  ScheduleItem,
  ScheduleList,
} from 'src/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDay: Date | null = null;
  selectedDayIndex: number | null = null;
  selectedWeek: Date | null = null;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' },
  ];

  @Input()
  set date(date: Date | null) {
    if (date) this.selectedDay = new Date(date.getTime());
  }

  @Input() items: ScheduleList | null = null;

  @Output() change = new EventEmitter<Date>();
  @Output() select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfTheWeek(
      new Date(this.selectedDay ?? new Date())
    );
  }

  getSection(name: string): ScheduleItem | null {
    return (this.items && this.items[name]) || {};
  }

  selectSection({ type, assigned, data }: any, section?: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data,
    });
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
