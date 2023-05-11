import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobSeekerPost } from 'src/app/class/job-seeker-post';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { ResumeService } from 'src/app/service/resume.service';

@Component({
  selector: 'app-saved-candidates',
  templateUrl: './saved-candidates.component.html',
  styleUrls: ['./saved-candidates.component.css']
})
export class SavedCandidatesComponent implements OnInit{
	public posts: JobSeekerPost[] = [];
	public username: string = '';
	public userId: string = '';
	private jwt: string = '';
	public pdfUrl: string = "";
	public constructor(
		private snackBar: MatSnackBar,
		private service: RecruiterService,
		private rs_service: ResumeService
	) { }

	public ngOnInit(): void {
		this.username = this.service.getSignedinUsername();
		this.userId = this.service.getSignedinUserID();
		this.jwt = this.service.getToken();
		this.getSavedCandidates();
	}

	public getSavedCandidates(): void {
		console.log(this.userId);
		this.service.fetchSavedCandidates(this.userId).subscribe({
			next: (resp: JobSeekerPost[]): void => {
				console.log(resp);
				this.posts = resp;
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				console.log(this.posts);
			}
		});
	}
	
	public viewPdf(id: string) {
		this.rs_service.getResume(id, this.jwt).subscribe({
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
}
