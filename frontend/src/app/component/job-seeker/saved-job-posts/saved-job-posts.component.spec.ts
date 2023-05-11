import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedJobPostsComponent } from './saved-job-posts.component';

describe('SavedJobPostsComponent', () => {
  let component: SavedJobPostsComponent;
  let fixture: ComponentFixture<SavedJobPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedJobPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedJobPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
