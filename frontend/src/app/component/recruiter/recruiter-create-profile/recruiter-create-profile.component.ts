import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Recruiter } from 'src/app/class/recruiter';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
	selector: 'app-recruiter-create-profile',
	templateUrl: './recruiter-create-profile.component.html',
	styleUrls: ['./recruiter-create-profile.component.css']
})
export class RecruiterCreateProfileComponent implements OnInit {
	public user: Recruiter = new Recruiter();
	constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private service: RecruiterService) { }
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
		this.service.createRecruiterProfile(this.user, this.user.id).subscribe({
			next: (resp: Recruiter): void => {
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