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
  connection;

  constructor(private transmitterService: TransmitterService) { }

  ngOnInit() {
    this.getTransmitters();
    this.connection = this.transmitterService.subscribe().subscribe(message => {
      console.log('got message');
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  getTransmitters(): void {
    this.transmitterService.getTransmitters()
        .subscribe(transmitters => this.transmitters = transmitters);
  }

  add(id: string): void {
    id = id.trim();
    if (!id) { return; }
    console.log(`adding transmitter ${id}`);
    this.transmitterService.addTransmitter({ id } as Transmitter)
      .subscribe(transmitter => {
        this.transmitters.push(transmitter);
      });
  }

  delete(transmitter: Transmitter): void {
    this.transmitters = this.transmitters.filter(t => t !== transmitter);
    this.transmitterService.deleteTransmitter(transmitter).subscribe();
  }
}
