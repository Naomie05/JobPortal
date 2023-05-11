import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobSeekerPost } from 'src/app/class/job-seeker-post';
import { AdminService } from 'src/app/service/admin.service';
import { ResumeDialogComponent } from '../resume-dialog/resume-dialog.component';

@Component({
  selector: 'app-admin-job-seeker-posts',
  templateUrl: './admin-job-seeker-posts.component.html',
  styleUrls: ['./admin-job-seeker-posts.component.css']
})
export class AdminJobSeekerPostsComponent implements OnInit {
	public posts!: JobSeekerPost[];
	public post: JobSeekerPost = new JobSeekerPost();
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
		this.getPosts();
		this.username = this.service.getSignedinUsername();
		this.userId = this.service.getSignedinUserID();
	}

	public openSnackBar(msg: string) {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}


	public getPosts() {
		this.service.getJobSeekerPosts().subscribe({
			next: (resp) => {
				console.log(resp);
				this.posts = resp;
			},
			error: (err) => {
				console.error(err);
			},
			complete: () => {
				console.info('completed');
				console.log(this.posts);
			}
		});
	}

	public getClickedJob(id: string): JobSeekerPost | undefined {
		console.log("id from click", id);
		const postMap = new Map<string, JobSeekerPost>();
		this.posts.forEach(p => postMap.set(p.id, p));
		this.post = postMap.get(id) as JobSeekerPost;
		if (this.post) {
			return this.post;
		}
		return undefined;
	}

	public openViewDialog(id: string): void {
		let post: JobSeekerPost | undefined = this.getClickedJob(id);
		if (!post) {
			return;
		}
		console.log(post);
		this.dialogRef = this.dialog.open(ResumeDialogComponent, {
			data: { post: post },
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobSeekerPost): void => {
			console.log('The dialog was closed');
		});
	}

	public deleteJobSeekerPost(id: string): void {
		this.service.deleteJobSeekerPostById(id).subscribe({
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
