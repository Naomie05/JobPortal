import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewJobApplicationComponent } from './review-job-application.component';

describe('ReviewJobApplicationComponent', () => {
  let component: ReviewJobApplicationComponent;
  let fixture: ComponentFixture<ReviewJobApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewJobApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewJobApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
