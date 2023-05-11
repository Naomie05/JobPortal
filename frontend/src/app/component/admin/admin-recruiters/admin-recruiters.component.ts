import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recruiter } from 'src/app/class/recruiter';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-recruiters',
  templateUrl: './admin-recruiters.component.html',
  styleUrls: ['./admin-recruiters.component.css']
})
export class AdminRecruitersComponent implements OnInit {
	public users: Recruiter[] = [];
	public user: Recruiter = new Recruiter();
	public userId: string = '';
	public username: string = '';
	//public expanded: boolean = true;

	public constructor(
		private service: AdminService,
		private snackBar: MatSnackBar,
	) {
	}

	public ngOnInit(): void {
		this.userId = this.service.getSignedinUserID();
		this.username = this.service.getSignedinUsername();
		this.getUsers();
	}

	public openSnackBar(msg: string): void {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}

	public getUsers(): void {
		this.service.getRecruiters().subscribe({
			next: (resp: Recruiter[]): void => {
				console.log(resp);
				this.users = resp;
				console.log(this.users);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				console.log(this.users);
			}
		});
	}

	public deleteUser(id: string): void {
		this.service.deleteRecruiterById(id).subscribe({
			next: (resp): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.users = this.users.filter(u => u.id !== id);
				this.openSnackBar('User was deleted');
			}
		});
	}
}
