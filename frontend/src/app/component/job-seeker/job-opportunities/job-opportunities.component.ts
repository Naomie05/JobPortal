import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobPost } from 'src/app/class/job-post';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { JobPostService } from 'src/app/service/job-post.service';
import { JobSeekerService } from 'src/app/service/job-seeker.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { JobOverviewComponent } from '../job-overview/job-overview.component';

@Component({
	selector: 'app-job-opportunities',
	templateUrl: './job-opportunities.component.html',
	styleUrls: ['./job-opportunities.component.css']
})
export class JobOpportunitiesComponent implements OnInit {
	public jobs!: JobPost[];
	public filteredJobs: JobPost[] = [];
	public sortedJobs: JobPost[] = [];
	public post: JobPost = new JobPost();
	public expanded: boolean = true;
	public dialogRef: any;
	public username: string = '';
	public userId: string = '';
	private jwt: string = '';
	public searchText!: string;
	public constructor(
		private r_service: JobPostService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private s_service: JobSeekerService,
		private a_service: JobApplicationService,
		private router: Router
	) { }

	public ngOnInit(): void {
		this.jwt = this.s_service.getToken();
		this.getJobs();
		this.username = this.s_service.getSignedinUsername();
		this.userId = this.s_service.getSignedinUserID();
	}

	public openSnackBar(msg: string) {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}

	public onClipboardCopy(successful: boolean): void {
		console.log(successful);
	}

	public getJobs() {
		this.r_service.fetchJobs(this.jwt).subscribe({
			next: (resp) => {
				console.log(resp);
				this.jobs = resp; // array of jobs (use *ngFor to display jobs inside met-card)
			},
			error: (err) => {
				console.error(err);
			},
			complete: () => {
				console.info('completed');
				console.log(this.jobs);
			}
		});
	}

	public getClickedJob(id: string): JobPost {
		console.log("id from click", id);
		const jobMap = new Map<string, JobPost>();
		this.jobs.forEach(job => jobMap.set(job.id, job));
		this.post = jobMap.get(id) as JobPost; // get returns val | undefined, cast the return to val
		if (this.post) {
			console.log("clicked post = ", this.post);
		} else {
			console.log(`Job post with id ${id} not found`);
		}
		return this.post;
	}

	public openViewDialog(id: string): void {
		let post: JobPost = this.getClickedJob(id);
		console.log(post);
		this.dialogRef = this.dialog.open(JobOverviewComponent, {
			data: {
				post: post
			},
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobPost): void => {
			console.log('The dialog was closed');
			//post = result;
		});
	}

	public apply(userId: string, postId: string): void {
		if (userId === null || postId === null) {
			this.openSnackBar("Error!")
			return;
		}
		this.s_service.applyForJob(userId, postId).subscribe({
			next: (resp) => {
				console.log(resp);
			},
			error: (err) => {
				console.error(err);
				// TODO: we need a better responce from the backend!
				// we can do better than this message 
				this.openSnackBar('Hmm, looks like you have already applied for this job!');
			},
			complete: () => {
				console.info('completed');
				this.openSnackBar('Successfully applied for the job!');
			}
		});
	}

	public savePost(userId: string, postId: string): void {
		if (userId === null || postId === null) {
			this.openSnackBar("Error!")
			return;
		}
		this.s_service.saveJobPost(userId, postId).subscribe({
			next: (resp) => {
				console.log(resp);
			},
			error: (err) => {
				console.error(err);
				// TODO: we need a better responce from the backend!
				// we can do better than this message 
				this.openSnackBar('Hmm, looks like the post is already saved!');
			},
			complete: () => {
				console.info('completed');
				this.openSnackBar('Job Post was saved successfully!');
			}
		});
	}

	public ascSort(): void {
		this.jobs.sort((a, b) => 
			a.salary - b.salary
		);
	}

	public desecSort(): void {
		this.jobs.sort((a, b) => 
			b.salary - a.salary
		);
	}

	public newToOld(): void {
		this.jobs.sort((a, b) =>
			b.createdAt.getTime() - a.createdAt.getTime()
		);
	}

	public oldToNew(): void {
		this.jobs.sort((a, b) =>
			a.createdAt.getTime() - b.createdAt.getTime()
		);
	}

	public search(): void {
		this.jobs = this.jobs.filter(job =>
			job.description.toLowerCase().includes(this.searchText.toLowerCase())
			|| job.title.toLowerCase().includes(this.searchText.toLowerCase())
			|| job.keywords.some(k =>
				k.toLowerCase().includes(this.searchText.toLowerCase())
				|| k.toLowerCase() === this.searchText.toLowerCase()
			)
		);
		console.log(this.jobs);
	}

	public reloadList(): void {
		this.getJobs();
	}
}