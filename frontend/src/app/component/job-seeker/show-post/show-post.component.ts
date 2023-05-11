import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {JobSeeker} from 'src/app/class/job-seeker';
import {JobSeekerPost} from 'src/app/class/job-seeker-post';
import {JobSeekerService} from 'src/app/service/job-seeker.service';
import {JobPost} from "../../../class/job-post";
import {UpdatePostDialogComponent} from "../../recruiter/update-post-dialog/update-post-dialog.component";
import {UpdateSeekerPostDialogComponent} from "../update-seeker-post-dialog/update-seeker-post-dialog.component";
import { ResumeService } from 'src/app/service/resume.service';

@Component({
	selector: 'app-show-post',
	templateUrl: './show-post.component.html',
	styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent {
	public user: JobSeeker = new JobSeeker();
	public posts: JobSeekerPost[] = [];
	public post: JobSeekerPost = new JobSeekerPost();
	public expanded: boolean = true;
	public dialogRef: any;
	private jwt: string = "";
	public pdfUrl: string = "";
	
	constructor(
		private snackBar: MatSnackBar,
		private route: Router,
		private service: JobSeekerService,
		private dialog: MatDialog,
		private r_service: ResumeService
	) {
		// this.user.name = this.route.snapshot.params['id']
	}
	
	public ngOnInit(): void {
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
		this.jwt = this.service.getToken();
		this.getPostsBySeekerId();
	}
	
	public noPosts(): boolean {
		return this.posts.length === 0;
	}
	
	public numberOfPosts(): number {
		return this.posts.length;
	}
	
	public getPostsBySeekerId(): void {
		this.service.fetchPostsBySeekerID(this.user.id).subscribe({
			next: (resp: JobSeekerPost[]): void => {
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
	
	public getClickedPost(id: string): JobSeekerPost {
		console.log("id from click", id);
		const jobMap: Map<string, JobSeekerPost> = new Map<string, JobSeekerPost>();
		this.posts.forEach(post => jobMap.set(post.id, post));
		this.post = jobMap.get(id) as JobSeekerPost; // get() returns val | undefined, cast the return to val
		if (this.post) {
			console.log("clicked post = ", this.post);
		} else {
			console.log(`Job post with id ${id} not found`);
		}
		return this.post;
	}

	public viewPdf(): void {
		this.r_service.getResume(this.user.id, this.jwt).subscribe({
			next: (resp): void => {
				const base64Data = resp['data'];
				const binaryString = window.atob(base64Data);
				const byteArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));
				const blob = new Blob([byteArray], { type: 'application/pdf' });
				this.pdfUrl = URL.createObjectURL(blob);
				console.log(this.pdfUrl);
				console.log(blob);
				console.log(base64Data);
				console.log(byteArray);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				window.open(this.pdfUrl, '_blank');
			}
		});
	}
	
	public openDialog(id: string): void {
		let post: JobSeekerPost = this.getClickedPost(id);
		console.log(post);
		this.dialogRef = this.dialog.open(UpdateSeekerPostDialogComponent, {
			data: {post: post},
			height: '600px', width: '850px'
		});
		this.dialogRef.afterClosed().subscribe((result: JobSeekerPost): void => {
			console.log('The dialog was closed');
			//post = result;
		});
	}

	public deletePost(id: string): void {
		this.service.deletePost(id).subscribe({
			next: (resp): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.posts = this.posts.filter(post => post.id !== id);
			}
		});
	}
}
