import { TestBed } from '@angular/core/testing';

import { SpiShowMoreColumnsService } from './spi-show-more-columns.service';

describe('SpiShowMoreColumnsService', () => {
  let service: SpiShowMoreColumnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiShowMoreColumnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
