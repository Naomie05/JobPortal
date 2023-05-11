import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerCreateProfileComponent } from './job-seeker-create-profile.component';

describe('JobSeekerUpdateProfileComponent', () => {
	let component: JobSeekerCreateProfileComponent;
	let fixture: ComponentFixture<JobSeekerCreateProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobSeekerCreateProfileComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(JobSeekerCreateProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
