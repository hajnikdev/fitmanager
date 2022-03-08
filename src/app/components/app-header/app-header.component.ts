import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { User } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() toggleMenu = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  toggleNavigationMenu() {
    this.toggleMenu.emit();
  }
}
