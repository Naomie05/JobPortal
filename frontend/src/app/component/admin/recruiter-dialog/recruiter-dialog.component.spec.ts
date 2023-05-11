import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDialogComponent } from './recruiter-dialog.component';

describe('RecruiterDialogComponent', () => {
  let component: RecruiterDialogComponent;
  let fixture: ComponentFixture<RecruiterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
