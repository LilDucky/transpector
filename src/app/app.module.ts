import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TransmittersComponent } from './transmitters/transmitters.component';
import { TransmitterDetailComponent } from './transmitter-detail/transmitter-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TransmittersComponent,
    TransmitterDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
