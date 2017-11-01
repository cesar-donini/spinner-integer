import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpinnerIntegerComponent } from './spinner-integer/spinner.integer.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerIntegerComponent
  ],
  exports: [
    SpinnerIntegerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
