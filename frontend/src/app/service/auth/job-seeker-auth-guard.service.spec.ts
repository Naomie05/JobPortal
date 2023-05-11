import { TestBed } from '@angular/core/testing';

import { JobSeekerAuthGuardService } from './job-seeker-auth-guard.service';

describe('JobSeekerAuthGuardService', () => {
  let service: JobSeekerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobSeekerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
