import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TransmitterDetailsComponent } from './transmitters/transmitter-details/transmitter-details.component';
import { TransmitterListComponent } from './transmitters/transmitter-list/transmitter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TransmitterDetailsComponent,
    TransmitterListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
