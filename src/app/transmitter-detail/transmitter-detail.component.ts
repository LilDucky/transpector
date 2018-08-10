import { Component, OnInit, Input } from '@angular/core';
import { Transmitter } from '../transmitter';

@Component({
  selector: 'app-transmitter-detail',
  templateUrl: './transmitter-detail.component.html',
  styleUrls: ['./transmitter-detail.component.css']
})
export class TransmitterDetailComponent implements OnInit {
  @Input() transmitter: Transmitter;

  constructor() { }

  ngOnInit() {
  }

}
