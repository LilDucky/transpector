import { TestBed, inject } from '@angular/core/testing';

import { TransmitterService } from './transmitter.service';

describe('TransmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransmitterService]
    });
  });

  it('should be created', inject([TransmitterService], (service: TransmitterService) => {
    expect(service).toBeTruthy();
  }));
});
