import { Component, OnInit } from '@angular/core';
import { JobApplication } from 'src/app/class/job-application';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { JobSeekerService } from 'src/app/service/job-seeker.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {
	public jobs!: JobApplication[];
	public username: string = "";
	public userId: string = "";
	public postId: string = "";
	private jwt: string = "";
	public constructor(private service: JobApplicationService, private s_service: JobSeekerService) { }

	public ngOnInit(): void {
		this.userId = this.s_service.getSignedinUserID();
		this.username = this.s_service.getSignedinUsername();
		this.jwt = this.s_service.getToken();
		this.getJobs();
	}
	public getJobs(): void {
		this.service.getJobApplicationBySeeker(this.userId, this.jwt).subscribe({
			next: (resp: JobApplication[]): void => {
				console.log(resp);
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

	public getClickedJobId(id: string): string {
		console.log("id from click", id);
		this.postId = id;
		return this.postId;
	}
}
