import { TestBed } from '@angular/core/testing';

import { SpiTableService } from './spi-table.service';

describe('SpiTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpiTableService = TestBed.get(SpiTableService);
    expect(service).toBeTruthy();
  });
});
