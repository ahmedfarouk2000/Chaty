import { TestBed } from '@angular/core/testing';

import { DataresolverService } from './dataresolver.service';

describe('DataresolverService', () => {
  let service: DataresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
