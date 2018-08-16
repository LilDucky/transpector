import { Component, OnInit, Input } from '@angular/core';
import { Transmitter } from '../transmitter';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TransmitterService }  from '../transmitter.service';

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
  selector: 'app-transmitter-detail',
  templateUrl: './transmitter-detail.component.html',
  styleUrls: ['./transmitter-detail.component.css']
})
export class TransmitterDetailComponent implements OnInit {
  @Input() transmitter: Transmitter;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private route: ActivatedRoute,
    private transmitterService: TransmitterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTransmitter();
  }

  getTransmitter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.transmitterService.getTransmitter(id)
      .subscribe(transmitter => this.transmitter = transmitter);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.transmitterService.updateTransmitter(this.transmitter)
      .subscribe(() => this.goBack());
  }
}
