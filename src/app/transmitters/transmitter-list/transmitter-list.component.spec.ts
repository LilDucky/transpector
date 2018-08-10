import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitterListComponent } from './transmitter-list.component';

describe('TransmitterListComponent', () => {
  let component: TransmitterListComponent;
  let fixture: ComponentFixture<TransmitterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmitterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmitterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
