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
    // TODO: send the message _after_ fetching the transmitters
    this.messageService.add('TransmitterService: fetched transmitters');
    return of(TRANSMITTERS);
  }

  getTransmitter(id: string): Observable<Transmitter> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`TransmitterService: fetched transmitter id=${id}`);
    return of(TRANSMITTERS.find(transmitter => transmitter.id === id));
  }
}
