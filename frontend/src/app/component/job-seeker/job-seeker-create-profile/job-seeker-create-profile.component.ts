import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { JobSeeker } from 'src/app/class/job-seeker';
import { JobSeekerService } from 'src/app/service/job-seeker.service';

@Component({
	selector: 'app-job-seeker-create-profile',
	templateUrl: './job-seeker-create-profile.component.html',
	styleUrls: ['./job-seeker-create-profile.component.css']
})

export class JobSeekerCreateProfileComponent implements OnInit {
	public user: JobSeeker = new JobSeeker();
	public tagsAsString: string = "";
	constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private service: JobSeekerService) { }
	public ngOnInit(): void {
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
	}

	public openSnackBar(): void {
		this.snackBar.open(`Hey ${this.user.username}! your profile was created successfully ✅`, '', {
			duration: 5000
		});
	}
	public createProfile(): void {
		this.user.tags = this.tagsAsString.split(',').map(tag => tag.trim());
		this.service.createJobSeekerProfile(this.user, this.user.id).subscribe({
			next: (resp): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.log(this.user);
				console.log(err);
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.openSnackBar();
			}
		});
	}

}