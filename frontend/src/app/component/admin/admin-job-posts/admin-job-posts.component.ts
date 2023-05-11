import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobPost } from 'src/app/class/job-post';
import { AdminService } from 'src/app/service/admin.service';
import { JobPostDialogComponent } from '../job-post-dialog/job-post-dialog.component';

@Component({
	selector: 'app-admin-job-posts',
	templateUrl: './admin-job-posts.component.html',
	styleUrls: ['./admin-job-posts.component.css']
})
export class AdminJobPostsComponent implements OnInit {
	public jobs!: JobPost[];
	public post: JobPost = new JobPost();
	public expanded: boolean = true;
	public dialogRef: any;
	public username: string = '';
	public userId: string = '';
	private jwt: string = '';
	public constructor(
		private service: AdminService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
	) { }

	public ngOnInit(): void {
		this.getJobs();
		this.username = this.service.getSignedinUsername();
		this.userId = this.service.getSignedinUserID();
	}

	public openSnackBar(msg: string) {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}


	public getJobs() {
		this.service.getJobPosts().subscribe({
			next: (resp) => {
				console.log(resp);
				this.jobs = resp;
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

	public getClickedJob(id: string): JobPost | undefined {
		console.log("id from click", id);
		const jobMap = new Map<string, JobPost>();
		this.jobs.forEach(job => jobMap.set(job.id, job));
		this.post = jobMap.get(id) as JobPost;
		if (this.post) {
			return this.post;
		}
		return undefined;
	}

	public openViewDialog(id: string): void {
		let post: JobPost | undefined = this.getClickedJob(id);
		if (!post) {
			return;
		}
		console.log(post);
		this.dialogRef = this.dialog.open(JobPostDialogComponent, {
			data: { post: post},
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobPost): void => {
			console.log('The dialog was closed');
		});
	}

	public deleteJobPost(id: string): void {
		this.service.deleteJobPostById(id).subscribe({
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