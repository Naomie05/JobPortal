import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSeekerPostDialogComponent } from './update-seeker-post-dialog.component';

describe('UpdateSeekerPostDialogComponent', () => {
  let component: UpdateSeekerPostDialogComponent;
  let fixture: ComponentFixture<UpdateSeekerPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSeekerPostDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSeekerPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
