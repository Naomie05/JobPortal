import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAppDialogComponent } from './job-app-dialog.component';

describe('JobAppDialogComponent', () => {
  let component: JobAppDialogComponent;
  let fixture: ComponentFixture<JobAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAppDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
