import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobApplication } from 'src/app/class/job-application';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { ReviewJobApplicationComponent } from '../review-job-application/review-job-application.component';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
	public jobs: JobApplication[] = [];
	public job: JobApplication = new JobApplication();
	public username: string = "";
	public userId: string = "";
	public postId: string = "";
	public dialogRef: any;
	private jwt: string = "";
	public constructor(
		private service: JobApplicationService,
		private r_service: RecruiterService,
		private dialog: MatDialog
	) { }

	public ngOnInit(): void {
		this.userId = this.r_service.getSignedinUserID();
		this.username = this.r_service.getSignedinUsername();
		this.jwt = this.r_service.getToken();
		this.getApplications();
	}
	public getApplications(): void {
		this.service.getJobApplicationByRecruiter(this.userId, this.jwt).subscribe({
			next: (resp: JobApplication[]): void => {
				console.log('this r', resp);
				this.jobs = resp;
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				console.log(this.jobs);
			}
		});
	}

	public getClickedPost(id: string): JobApplication {
		console.log("id from click", id);
		const jobMap: Map<string, JobApplication> = new Map<string, JobApplication>();
		this.jobs.forEach(job => jobMap.set(job.id, job));
		this.job = jobMap.get(id) as JobApplication; // get returns val | undefined, cast the return to val
		if (this.job) {
			console.log("clicked post = ", this.job);
		} else {
			console.log(`Post with id ${id} not found`);
		}
		return this.job;
	}

	public openDialog(id: string): void {
		let job: JobApplication = this.getClickedPost(id);
		//console.log(job);
		this.dialogRef = this.dialog.open(ReviewJobApplicationComponent, {
			data: { job: job },
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobApplication): void => {
			console.log('The dialog was closed');
		});
	}
}