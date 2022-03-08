import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavComponent {
  @Input() menuVisibility: boolean = false;
  @Output() logout = new EventEmitter<any>();
  @Output() toggleMenu = new EventEmitter<any>();

  toggleNavigationMenu() {
    this.toggleMenu.emit();
  }

  logoutUser() {
    this.logout.emit();
  }
}
