import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// Models
import { ScheduleItem } from 'src/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSectionComponent {
  @Input() name: string | null = null;
  @Input() section: ScheduleItem | null = null;

  @Output() select = new EventEmitter<any>();
  constructor() {}

  onSelect(type: string, assigned: any[] | null = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data,
    });
  }
}
