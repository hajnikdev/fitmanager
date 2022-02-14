import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {
  @Input() item: any;

  @Output() remove = new EventEmitter<any>()
  toggled: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getRoute(item: any) {
    return [`../meals`, item.$key];
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem(item: any) {
    this.remove.emit(item)
  }
}
