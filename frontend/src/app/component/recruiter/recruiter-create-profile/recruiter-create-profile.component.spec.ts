import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterCreateProfileComponent } from './recruiter-create-profile.component';

describe('RecruiterCreateProfileComponent', () => {
  let component: RecruiterCreateProfileComponent;
  let fixture: ComponentFixture<RecruiterCreateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterCreateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterCreateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
