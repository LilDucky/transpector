import { Injectable } from '@angular/core';
import { Transmitter } from './transmitter';
import { TRANSMITTERS } from './mock-transmitters';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {

  constructor(private messageService: MessageService) { }

  getTransmitters(): Observable<Transmitter[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('TransmitterService: fetched transmitters');
    return of(TRANSMITTERS);
  }
}
