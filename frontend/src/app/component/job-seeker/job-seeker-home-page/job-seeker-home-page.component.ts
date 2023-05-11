import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { JobSeekerService } from 'src/app/service/job-seeker.service';
import { JobSeeker } from '../../../class/job-seeker';

@Component({
	selector: 'app-job-seeker-home-page',
	templateUrl: './job-seeker-home-page.component.html',
	styleUrls: ['./job-seeker-home-page.component.css']
})
export class JobSeekerHomePageComponent implements OnInit {
	public user: JobSeeker = new JobSeeker();
	public isExpanded: boolean = false;

	constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private service: JobSeekerService) {
		// this.user.name = this.route.snapshot.params['id']
	}
	public ngOnInit(): void {
		// get the username and id from the session storage 
		// when initializing the component
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
	}

	public openSnackBar() {
		this.snackBar.open(`Bye ${this.user.username} 👋 `, '', {
			duration: 5000
		});
	}
	
	public logOut() {
		// TODO: logout 
		this.service.logOut();
		this.openSnackBar();
	}

	public toggleSidenav() {
		this.isExpanded = !this.isExpanded;
	}
}
