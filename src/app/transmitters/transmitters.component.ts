import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { Transmitter } from '../transmitter';
import { TransmitterService } from '../transmitter.service';
import { TimeAgoPipe } from 'time-ago-pipe';

@Component({
  selector: 'app-transmitters',
  templateUrl: './transmitters.component.html',
  styleUrls: ['./transmitters.component.css']
})

export class TransmittersComponent implements OnInit, OnDestroy {
  connection;

  displayedColumns: string[] = ['id', 'readDate', 'activationDate', 'status', 'rssi', 'batterya', 'batteryb', 'resist', 'reset', 'delete'];
  dataSource = new TransmitterDataSource(this.transmitterService);

  constructor(private transmitterService: TransmitterService) { }

  ngOnInit() {
    this.dataSource.loadTransmitters();
    this.connection = this.transmitterService.subscribe().subscribe(message => {
      console.log('got message');
      this.dataSource.loadTransmitters(); // TODO: this is overkill
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  add(id: string): void {
    id = id.trim();
    if (!id) { return; }
    console.log(`adding transmitter ${id}`);
    this.transmitterService.addTransmitter({ id } as Transmitter)
    .subscribe(transmitter => {
      this.dataSource.loadTransmitters();
    });
  }

  delete(transmitter: Transmitter): void {
    // this.transmitters = this.transmitters.filter(t => t !== transmitter);
    this.transmitterService.deleteTransmitter(transmitter)
    .subscribe(() => {
      console.log('in subscribe after deleting transmitter');
      this.dataSource.loadTransmitters();
    });
  }

  reset(transmitter: Transmitter): void {
    console.log(`got reset for id ${transmitter.id}`)
    this.transmitterService.resetTransmitter(transmitter).subscribe();
  }
}

export class TransmitterDataSource extends DataSource<Transmitter> {

  private transmittersSubject = new BehaviorSubject<Transmitter[]>([]);

  constructor(private transmitterService: TransmitterService) {
    super();
  }

  connect(): Observable<Transmitter[]> {
    return this.transmittersSubject.asObservable();
  }

  loadTransmitters() {
    console.log('loading txs');
    this.transmitterService.getTransmitters()
    .subscribe(transmitters => this.transmittersSubject.next(transmitters));
  }

  disconnect() {
    this.transmittersSubject.complete();
  }
}
