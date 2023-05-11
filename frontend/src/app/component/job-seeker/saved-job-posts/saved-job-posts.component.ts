import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobPost } from 'src/app/class/job-post';
import { JobSeekerService } from 'src/app/service/job-seeker.service';
import { JobOverviewComponent } from '../job-overview/job-overview.component';

@Component({
  selector: 'app-saved-job-posts',
  templateUrl: './saved-job-posts.component.html',
  styleUrls: ['./saved-job-posts.component.css']
})
export class SavedJobPostsComponent implements OnInit {
	public jobs!: JobPost[];
	public post: JobPost = new JobPost();
	public username: string = '';
	public userId: string = '';
	public dialogRef: any;
	public constructor(
		private snackBar: MatSnackBar,
		private s_service: JobSeekerService,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void {
		this.username = this.s_service.getSignedinUsername();
		this.userId = this.s_service.getSignedinUserID();
		this.getSavedJobs();
	}

	public openSnackBar(msg: string): void {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}

	public getSavedJobs(): void {
		console.log(this.userId);
		this.s_service.fetchSavedJobPosts(this.userId).subscribe({
			next: (resp: JobPost[]): void => {
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

	public getClickedJob(id: string): JobPost {
		console.log("id from click", id);
		const jobMap: Map<string, JobPost> = new Map<string, JobPost>();
		this.jobs.forEach(job => jobMap.set(job.id, job));
		this.post = jobMap.get(id) as JobPost; // get returns val | undefined, cast the return to val
		if (this.post) {
			console.log("clicked post = ", this.post);
		} else {
			console.log(`Job post with id ${id} not found`);
		}
		return this.post;
	}
	public openDialog(id: string): void {
		let post: JobPost = this.getClickedJob(id);
		console.log(post);
		this.dialogRef = this.dialog.open(JobOverviewComponent, {
			data: { post: post },
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobPost): void => {
			console.log('The dialog was closed');
			//post = result;
		});
	}

	public deleteSavedJob(id: string): void {
		this.s_service.deleteSavedJobPost(this.userId, id).subscribe({
			next: (resp): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.jobs = this.jobs.filter(j => j.id !== id);
				//window.location.reload();
				this.openSnackBar('job post is deleted');
			}
		});
	}
}
