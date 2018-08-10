import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitterDetailsComponent } from './transmitter-details.component';

describe('TransmitterDetailsComponent', () => {
  let component: TransmitterDetailsComponent;
  let fixture: ComponentFixture<TransmitterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmitterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmitterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
