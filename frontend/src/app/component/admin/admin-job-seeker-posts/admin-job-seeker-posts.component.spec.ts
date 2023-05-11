import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobSeekerPostsComponent } from './admin-job-seeker-posts.component';

describe('AdminJobSeekerPostsComponent', () => {
  let component: AdminJobSeekerPostsComponent;
  let fixture: ComponentFixture<AdminJobSeekerPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJobSeekerPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJobSeekerPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
