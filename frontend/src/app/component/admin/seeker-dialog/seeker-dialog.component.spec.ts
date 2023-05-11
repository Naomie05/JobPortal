import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerDialogComponent } from './seeker-dialog.component';

describe('SeekerDialogComponent', () => {
  let component: SeekerDialogComponent;
  let fixture: ComponentFixture<SeekerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
