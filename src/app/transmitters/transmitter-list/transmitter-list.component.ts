import { Component, OnInit } from '@angular/core';
import { Transmitter } from '../transmitter';
import { TransmitterService } from '../transmitter.service';
import { TransmitterDetailsComponent } from '../transmitter-details/transmitter-details.component';

@Component({
  selector: 'transmitter-list',
  templateUrl: './transmitter-list.component.html',
  styleUrls: ['./transmitter-list.component.css'],
  providers: [TransmitterService]
})

export class TransmitterListComponent implements OnInit {

  transmitters: Transmitter[]
  selectedTransmitter: Transmitter

  constructor(private transmitterService: TransmitterService) { }

  ngOnInit() {
     this.transmitterService
      .getTransmitters()
      .then((transmitters: Transmitter[]) => {
        this.transmitters = transmitters;
      });
  }

  private getIndexOfTransmitter = (transmitterId: String) => {
    return this.transmitters.findIndex((transmitter) => {
      return transmitter.id === transmitterId;
    });
  }

  selectTransmitter(transmitter: Transmtter) {
    this.selectedTransmitter = transmitter;
  }

  createNewTransmitter() {
    var transmitter: Transmitter = {
      id: ''
    };

    // By default, a newly-created transmitter will have the selected state.
    this.selectTransmitter(transmitter);
  }

  deleteTransmitter = (transmitterId: String) => {
    var idx = this.getIndexOfTransmitter(transmitterID);
    if (idx !== -1) {
      this.transmitters.splice(idx, 1);
      this.selectTransmitter(null);
    }
    return this.transmitters;
  }

  addTransmitter = (transmitter: Transmitter) => {
    this.transmitter.push(transmitter);
    this.selectTransmitter(transmitter);
    return this.transmitters;
  }

  updateTransmitter = (transmitter: Transmitter) => {
    var idx = this.getIndexOfTransmitter(transmitter.id);
    if (idx !== -1) {
      this.transmitter[idx] = transmitter;
      this.selectTransmitter(transmitter);
    }
    return this.transmitters;
  }
}
