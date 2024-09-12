import { TestBed } from '@angular/core/testing';

import { CotarService } from './cotar.service';

describe('CotarService', () => {
  let service: CotarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
