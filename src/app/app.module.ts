import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';

// Feature modules
import { AuthModule } from 'src/auth/auth.module';

// Store
import { Store } from 'store';

// Components
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
