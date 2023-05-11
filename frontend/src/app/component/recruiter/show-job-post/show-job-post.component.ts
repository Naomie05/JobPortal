import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { JobPost } from 'src/app/class/job-post';
import { Recruiter } from 'src/app/class/recruiter';
import { JobPostService } from 'src/app/service/job-post.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { UpdatePostDialogComponent } from "../update-post-dialog/update-post-dialog.component";

@Component({
	selector: 'app-show-job-post',
	templateUrl: './show-job-post.component.html',
	styleUrls: ['./show-job-post.component.css']
})
export class ShowJobPostComponent implements OnInit {
	//public user: Recruiter = new Recruiter();
	public posts: JobPost[] = [];
	public post: JobPost = new JobPost();
	public expanded: boolean = true;
	public dialogRef: any;
	private jwt: string = '';
	public userId: string = '';
	public username: string = '';

	constructor(private snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private service: RecruiterService,
		private j_service: JobPostService,
		private dialog: MatDialog
	) {
		// this.user.name = this.route.snapshot.params['id']
	}

	public ngOnInit(): void {
		this.jwt = this.service.getToken();
		this.username = this.service.getSignedinUsername();
		this.userId = this.service.getSignedinUserID();
		this.getPostsByRecruiterId();
	}

	public noPosts(): boolean {
		return this.posts.length === 0;
	}

	public numberOfPosts(): number {
		return this.posts.length;
	}

	public getPostsByRecruiterId(): void {
		this.j_service.fetchJobsByRecruiterID(this.userId, this.jwt).subscribe({
			next: (resp: JobPost[]): void => {
				console.log(resp);
				this.posts = resp;
			},
			error: (err): void => {
				console.error(err);

			},
			complete: (): void => {
				console.info('completed');
			}
		});
	}

	public getClickedPost(id: string): JobPost {
		console.log("id from click", id);
		const jobMap: Map<string, JobPost> = new Map<string, JobPost>();
		this.posts.forEach(post => jobMap.set(post.id, post));
		this.post = jobMap.get(id) as JobPost; // get returns val | undefined, cast the return to val
		if (this.post) {
			console.log("clicked post = ", this.post);
		} else {
			console.log(`Job post with id ${id} not found`);
		}
		return this.post;
	}

	public openDialog(id: string): void {
		let post: JobPost = this.getClickedPost(id);
		console.log(post);
		this.dialogRef = this.dialog.open(UpdatePostDialogComponent, {
			data: { post: post },
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobPost): void => {
			console.log('The dialog was closed');
			//post = result;
		});
	}
}