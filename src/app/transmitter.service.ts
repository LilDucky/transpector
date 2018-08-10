import { Injectable } from '@angular/core';
import { Transmitter } from './transmitter';
import { TRANSMITTERS } from './mock-transmitters';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransmitterService {

  constructor() { }

  getTransmitters(): Observable<Transmitter[]> {
    return of(TRANSMITTERS);
  }
}
