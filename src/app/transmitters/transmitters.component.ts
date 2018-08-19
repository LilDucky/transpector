import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Transmitter } from '../transmitter';
import { TransmitterService } from '../transmitter.service';
import { TimeAgoPipe } from 'time-ago-pipe';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-transmitters',
  templateUrl: './transmitters.component.html',
  styleUrls: ['./transmitters.component.css']
})
export class TransmittersComponent implements OnInit {
  transmitters: Transmitter[];
  date: Date = new Date('2018-06-21T12:47:06.704Z');
  connection;

  // displayedColumns: string[] = ['name', 'email', 'phone', 'company'];
  displayedColumns: string[] = ['id', 'readDate', 'activationDate', 'rssi'];
  dataSource = new TransmitterDataSource(this.transmitterService);


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  constructor(private transmitterService: TransmitterService) { }

  ngOnInit() {
    this.getTransmitters();
    this.connection = this.transmitterService.subscribe().subscribe(message => {
      console.log('got message');
      this.getTransmitters(); // TODO: this is overkill
    })
  }fsfewt

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
export class TransmitterDataSource extends DataSource<any> {
  constructor(private transmitterService: TransmitterService) {
    super();
  }
  connect(): Observable<Transmitter[]> {
    return this.transmitterService.getTransmitters();
  }
  disconnect() {}
}


// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import {DataSource} from '@angular/cdk/collections';
// import { User } from '../../models/user.model';
