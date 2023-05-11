import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Admin } from 'src/app/class/admin';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	public user: Admin = new Admin();
	public isExpanded: boolean = false;

	constructor(
		private snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private service: AdminService) {

	}
	public ngOnInit(): void {
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
	}

	public openSnackBar() {
		this.snackBar.open(`Bye ${this.user.username} 👋 `, '', {
			duration: 5000
		});
	}

	public logOut() {
		this.service.logOut();
		this.openSnackBar();
	}

	public toggleSidenav() {
		this.isExpanded = !this.isExpanded;
	}
}