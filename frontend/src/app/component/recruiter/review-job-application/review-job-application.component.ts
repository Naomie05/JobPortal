import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JobApplication} from 'src/app/class/job-application';
import {JobPost} from "../../../class/job-post";
import {JobApplicationService} from "../../../service/job-application.service";
import {RecruiterService} from "../../../service/recruiter.service";
import { ResumeService } from 'src/app/service/resume.service';

@Component({
	selector: 'app-review-job-application',
	templateUrl: './review-job-application.component.html',
	styleUrls: ['./review-job-application.component.css']
})
export class ReviewJobApplicationComponent implements OnInit {
	
	private jwt: string = "";
	public editMode: boolean = false;
	public app: JobApplication = new JobApplication();
	public pdfUrl: string = "";
	public isResume: boolean = true;

	constructor(
		public dialogRef: MatDialogRef<ReviewJobApplicationComponent>,
		@Inject(MAT_DIALOG_DATA) public job: any,
		private service: RecruiterService,
		private a_service: JobApplicationService,
		private rs_service: ResumeService,
	) {
		this.job = job['job'];
		this.app = this.job as JobApplication;
		//console.log(job['job']);
	}
	
	public onCloseDialog(): void {
		this.dialogRef.close();
	}
	
	public ngOnInit(): void {
		this.jwt = this.service.getToken();
		this.checkResume(this.app.user.id);
	}
	
	public updateJobApplication(id: string): void {
		// post + user aren't needed in the request
		const appToUpdate: JobApplication = Object.assign({},
			this.app, {
				post: undefined,
				user: undefined
			}
		);
		this.a_service.updateJobApplication(this.jwt, id, appToUpdate).subscribe({
			next: (resp: JobApplication): void => {
				console.log('this r', resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				console.log(this.app);
			}
		});
	}

	public checkResume(id: string): void{
		this.viewPdf(id)
	}

	public viewPdf(id: string) {
		this.rs_service.getResume(id, this.jwt).subscribe({
			next: (resp): void => {
				this.isResume = true;
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
				this.isResume = false;
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				window.open(this.pdfUrl, '_blank');
			}
		});
	}
}
