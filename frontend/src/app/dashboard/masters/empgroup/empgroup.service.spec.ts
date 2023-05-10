import { TestBed } from '@angular/core/testing';

import { EmpgroupService } from './empgroup.service';

describe('EmpgroupService', () => {
  let service: EmpgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
