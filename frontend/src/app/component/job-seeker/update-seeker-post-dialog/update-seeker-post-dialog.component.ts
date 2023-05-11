import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {JobPost} from "../../../class/job-post";
import {JobSeekerPost} from "../../../class/job-seeker-post";
import {JobSeekerService} from "../../../service/job-seeker.service";
import {RecruiterService} from "../../../service/recruiter.service";

@Component({
	selector: 'app-update-seeker-post-dialog',
	templateUrl: './update-seeker-post-dialog.component.html',
	styleUrls: ['./update-seeker-post-dialog.component.css']
})
export class UpdateSeekerPostDialogComponent {
	public keywordsAsString: string = "";
	public extractedKeywords: string[] = [];
	
	constructor(
		public dialogRef: MatDialogRef<UpdateSeekerPostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public post: any,
		private service: JobSeekerService
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
	
	public onCancelUserDialog(): void {
		this.dialogRef.close();
	}
	
	public updatePost(): void {
		this.post.seeker = null; // it's managed by post id, no need to the backend
		this.post.keywords = this.keywordsAsString.split(',').map(keyword => keyword.trim());
		this.service.updatePost(this.post, this.post.id).subscribe({
			next: (resp: JobSeekerPost): void => {
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
