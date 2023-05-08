import { TestBed } from '@angular/core/testing';

import { MedicalTestProfileService } from './medical-test-profile.service';

describe('MedicalTestProfileService', () => {
  let service: MedicalTestProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalTestProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
