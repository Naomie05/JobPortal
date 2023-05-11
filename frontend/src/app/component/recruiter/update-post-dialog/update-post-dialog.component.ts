import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { JobPostService } from 'src/app/service/job-post.service';
import {JobPost} from "../../../class/job-post";
import {RecruiterService} from "../../../service/recruiter.service";
import {ShowJobPostComponent} from "../show-job-post/show-job-post.component";

@Component({
	selector: 'app-update-post-dialog',
	templateUrl: './update-post-dialog.component.html',
	styleUrls: ['./update-post-dialog.component.css']
})
export class UpdatePostDialogComponent implements OnInit{
	
	public keywordsAsString: string = "";
	public extractedKeywords: string[] = [];
	private jwt: string = '';
	
	constructor(
		public dialogRef: MatDialogRef<UpdatePostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public post: any,
		private service: RecruiterService,
		private j_service: JobPostService
	) {
		/* in json resp, the post data is retrieved from ShowJobPostComponent
		 as
		 `Object {
			 post: {
			 title: ".."
			 salary: ".."
			 ...
			 }
		 }
		*/
		// just to access `post` obj inside `Object` obj
		this.post = post['post'];
		this.extractedKeywords = post['keywords']
		// console.log(post);
		// console.log(post['post']);
	}
	public ngOnInit(): void {
		this.jwt = this.service.getToken();
	}
	
	public onCancelUserDialog(): void {
		this.dialogRef.close();
	}
	
	public updateProfile(): void {
		this.post.recruiter = null;// it's managed by post id, no need to the backend
		this.post.keywords = this.keywordsAsString.split(',').map(keyword => keyword.trim());
		this.j_service.updateJobPost(this.post, this.post.id, this.jwt).subscribe({
			next: (resp: JobPost): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
				
			},
			complete: (): void => {
				console.info('completed');
			}
		});
	}
}
