import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobApplicationsComponent } from './admin-job-applications.component';

describe('AdminJobApplicationsComponent', () => {
  let component: AdminJobApplicationsComponent;
  let fixture: ComponentFixture<AdminJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
