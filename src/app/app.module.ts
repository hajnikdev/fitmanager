import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Feature modules
import { AuthModule } from 'src/auth/auth.module';

import { Store } from 'store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule],
  providers: [Store],
  bootstrap: [AppComponent],
})
export class AppModule {}
