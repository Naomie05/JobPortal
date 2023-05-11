import { TestBed } from '@angular/core/testing';

import { RecruiterAuthGuardService } from './recruiter-auth-guard.service';

describe('RecruiterAuthGuardService', () => {
  let service: RecruiterAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
