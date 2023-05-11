import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecruitersComponent } from './admin-recruiters.component';

describe('AdminRecruitersComponent', () => {
  let component: AdminRecruitersComponent;
  let fixture: ComponentFixture<AdminRecruitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecruitersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecruitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
