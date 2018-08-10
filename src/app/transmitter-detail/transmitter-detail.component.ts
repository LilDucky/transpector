import { Component, OnInit, Input } from '@angular/core';
import { Transmitter } from '../transmitter';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TransmitterService }  from '../transmitter.service';

@Component({
  selector: 'app-transmitter-detail',
  templateUrl: './transmitter-detail.component.html',
  styleUrls: ['./transmitter-detail.component.css']
})
export class TransmitterDetailComponent implements OnInit {
  @Input() transmitter: Transmitter;

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
}
