import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFireDatabaseModule } from '@angular/fire/database';

// Components
import { ListItemComponent } from './components/list-item/list-item.component';

// Services
import { MealsService } from './services/meals/meals.service';

@NgModule({
  declarations: [ListItemComponent],
  imports: [CommonModule, RouterModule, AngularFireDatabaseModule],
  exports: [ListItemComponent],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [MealsService],
    };
  }
}
