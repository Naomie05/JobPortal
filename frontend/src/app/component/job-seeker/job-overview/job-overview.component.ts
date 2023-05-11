import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route } from '@angular/router';
import { JobPost } from 'src/app/class/job-post';
import { JobPostService } from 'src/app/service/job-post.service';
import { JobSeekerService } from 'src/app/service/job-seeker.service';

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent {
	// private id!: string | null;
	// private jwt: string = '';
	// public post: JobPost = new JobPost();
	constructor(
		public dialogRef: MatDialogRef<JobOverviewComponent>,
		@Inject(MAT_DIALOG_DATA) public post: any,
		// private service: JobPostService,
		// private s_service: JobSeekerService,
		// private route: ActivatedRoute
	) {
		this.post = post['post'];
	}
	// public ngOnInit(): void {
	// 	this.route.paramMap.subscribe(params => {
	// 		this.id = params.get('id');
	// 	});
	// 	console.log(this.id);
	// 	this.jwt = this.s_service.getToken();
	// 	this.getJoPost();
	// }

	// public getJoPost(): void {
	// 	this.service.getJobPostById(this.jwt, this.id).subscribe({
	// 		next: (resp) => {
	// 			console.log(resp);
	// 			this.post = resp;
	// 		},
	// 		error: (err) => {
	// 			console.error(err);
	// 		},
	// 		complete: () => {
	// 			console.info('completed');
	// 		}
	// 	});
	// }
	public onCloselUserDialog(): void {
		this.dialogRef.close();
	}
}
