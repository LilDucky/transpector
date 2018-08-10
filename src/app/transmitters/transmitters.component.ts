import { Component, OnInit } from '@angular/core';
import { Transmitter } from '../transmitter';
import { TransmitterService } from '../transmitter.service';

@Component({
  selector: 'app-transmitters',
  templateUrl: './transmitters.component.html',
  styleUrls: ['./transmitters.component.css']
})
export class TransmittersComponent implements OnInit {
  transmitters: Transmitter[];

  constructor(private transmitterService: TransmitterService) { }

  ngOnInit() {
    this.getTransmitters();
  }

  getTransmitters(): void {
    this.transmitterService.getTransmitters()
        .subscribe(transmitters => this.transmitters = transmitters);
  }
}
