import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobPostsComponent } from './admin-job-posts.component';

describe('AdminJobPostsComponent', () => {
  let component: AdminJobPostsComponent;
  let fixture: ComponentFixture<AdminJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
