import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
})
export class ScheduleControlsComponent {
  offset = 0;

  @Input() selected: Date | null = null;

  @Output() move = new EventEmitter<number>();

  constructor() {}

  moveDate(offset: number) {
    this.offset = offset;
    this.move.emit(offset);
  }
}
