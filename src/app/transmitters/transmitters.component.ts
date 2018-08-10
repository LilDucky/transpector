import { Component, OnInit } from '@angular/core';
import { Transmitter } from '../transmitter';
import { TRANSMITTERS } from '../mock-transmitters';

@Component({
  selector: 'app-transmitters',
  templateUrl: './transmitters.component.html',
  styleUrls: ['./transmitters.component.css']
})
export class TransmittersComponent implements OnInit {
  transmitters = TRANSMITTERS;

  selectedTransmitter: Transmitter;

  onSelect(transmitter: Transmitter): void {
    this.selectedTransmitter = transmitter;
  }

  constructor() { }

  ngOnInit() {
  }

}
