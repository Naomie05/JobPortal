import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobApplication } from 'src/app/class/job-application';
import { AdminService } from 'src/app/service/admin.service';
import { JobAppDialogComponent } from '../job-app-dialog/job-app-dialog.component';

@Component({
  selector: 'app-admin-job-applications',
  templateUrl: './admin-job-applications.component.html',
  styleUrls: ['./admin-job-applications.component.css']
})
export class AdminJobApplicationsComponent implements OnInit {
	public apps!: JobApplication[];
	public app: JobApplication = new JobApplication();
	public expanded: boolean = true;
	public dialogRef: any;
	public username: string = '';
	public userId: string = '';

	public constructor(
		private service: AdminService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
	) { }

	public ngOnInit(): void {
		this.getApplications();
		this.username = this.service.getSignedinUsername();
		this.userId = this.service.getSignedinUserID();
	}

	public openSnackBar(msg: string) {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}


	public getApplications() {
		this.service.getJobApplications().subscribe({
			next: (resp) => {
				console.log(resp);
				this.apps = resp;
			},
			error: (err) => {
				console.error(err);
			},
			complete: () => {
				console.info('completed');
				console.log(this.apps);
			}
		});
	}

	public getClickedJob(id: string): JobApplication | undefined {
		console.log("id from click", id);
		const jobMap = new Map<string, JobApplication>();
		this.apps.forEach(app => jobMap.set(app.id, app));
		this.app = jobMap.get(id) as JobApplication;
		if (this.app) {
			return this.app;
		}
		return undefined;
	}

	public openViewDialog(id: string): void {
		let app: JobApplication | undefined = this.getClickedJob(id);
		if (!app) {
			return;
		}
		console.log(app);
		this.dialogRef = this.dialog.open(JobAppDialogComponent, {
			data: { job: app },
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobApplication): void => {
			console.log('The dialog was closed');
		});
	}

	public deleteJobApplication(id: string): void {
		this.service.deleteJobApplicationById(id).subscribe({
			next: (resp) => {
				console.log(resp);
			},
			error: (err) => {
				console.error(err);
			},
			complete: () => {
				console.info('completed');
				this.openSnackBar('Post was delete!');
			}
		});
	}
}
