import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatTableModule } from '@angular/material';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TransmittersComponent } from './transmitters/transmitters.component';
import { TransmitterDetailComponent } from './transmitter-detail/transmitter-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { TimeAgoPipe } from 'time-ago-pipe';


@NgModule({
  declarations: [
    AppComponent,
    TransmittersComponent,
    TransmitterDetailComponent,
    MessagesComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
