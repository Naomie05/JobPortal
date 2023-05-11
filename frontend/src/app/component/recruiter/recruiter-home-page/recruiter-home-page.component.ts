import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Recruiter } from 'src/app/class/recruiter';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
	selector: 'app-recruiter-home-page',
	templateUrl: './recruiter-home-page.component.html',
	styleUrls: ['./recruiter-home-page.component.css']
})
export class RecruiterHomePageComponent implements OnInit {
	public opened: boolean = false;
	public user: Recruiter = new Recruiter();
	constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private service: RecruiterService) {
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
	public getActiveUsername() {
		this.user.username = this.service.getSignedinUsername();
	}

	public getActiveUserID() {
		this.user.id = this.service.getSignedinUserID();
	}
	public toggleSidenav() {
		this.opened = !this.opened;
	}
	public logOut() {
		// TODO: logout 
		this.service.logOut();
		this.openSnackBar();
	}
}
