import { Injectable } from '@angular/core';
import { Transmitter } from './transmitter';
import { TRANSMITTERS } from './mock-transmitters';

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {

  constructor() { }

  getTransmitters(): Transmitter[] {
    return TRANSMITTERS;
  }
}
