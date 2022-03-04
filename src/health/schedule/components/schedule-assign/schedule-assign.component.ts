import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

// Models
import { Meal } from 'src/health/shared/services/meals/meals.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleAssignComponent implements OnInit {
  @Input() section: any = null;
  @Input() list: Meal[] | Workout[] | null | undefined | any = [];

  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  private selected: any[] = [];

  ngOnInit(): void {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter((item) => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected,
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
