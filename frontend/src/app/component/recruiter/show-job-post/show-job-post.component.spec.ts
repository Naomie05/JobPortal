import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobPostComponent } from './show-job-post.component';

describe('ShowJobPostComponent', () => {
  let component: ShowJobPostComponent;
  let fixture: ComponentFixture<ShowJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowJobPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
