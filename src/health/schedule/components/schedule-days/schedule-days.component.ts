import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleDaysComponent {
  @Input() selected: number | null = null;

  @Output() select = new EventEmitter<number>();
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  constructor() {}

  selectDay(index: number) {
    this.select.emit(index);
  }
}
