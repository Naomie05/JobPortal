import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHomePageComponent } from './recruiter-home-page.component';

describe('RecruiterHomePageComponent', () => {
  let component: RecruiterHomePageComponent;
  let fixture: ComponentFixture<RecruiterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
