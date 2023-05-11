import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostDialogComponent } from './job-post-dialog.component';

describe('JobPostDialogComponent', () => {
  let component: JobPostDialogComponent;
  let fixture: ComponentFixture<JobPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPostDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
