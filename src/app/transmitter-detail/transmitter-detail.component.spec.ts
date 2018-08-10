import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmitterDetailComponent } from './transmitter-detail.component';

describe('TransmitterDetailComponent', () => {
  let component: TransmitterDetailComponent;
  let fixture: ComponentFixture<TransmitterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmitterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmitterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
