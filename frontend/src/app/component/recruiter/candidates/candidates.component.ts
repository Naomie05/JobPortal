import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobSeekerPost } from 'src/app/class/job-seeker-post';
import { JobSeekerService } from 'src/app/service/job-seeker.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { ResumeService } from 'src/app/service/resume.service';

@Component({
	selector: 'app-candidates',
	templateUrl: './candidates.component.html',
	styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
	public posts: JobSeekerPost[] = [];
	public userId: string = '';
	public username: string = '';
	private jwt: string = '';
	public pdfUrl: string = "";
	public searchText!: string;
	//public expanded: boolean = true;

	public constructor(
		private service: JobSeekerService,
		private r_service: RecruiterService,
		private rs_service: ResumeService,
		private snackBar: MatSnackBar,
	) { }

	public ngOnInit(): void {
		this.userId = this.r_service.getSignedinUserID();
		this.username = this.r_service.getSignedinUsername();
		this.jwt = this.r_service.getToken();
		this.getPosts();
	}

	public openSnackBar(msg: string): void {
		this.snackBar.open(`Hey ${this.username}! ${msg}`, '', {
			duration: 5000
		});
	}
	public getPosts(): void {
		this.service.fetchPosts().subscribe({
			next: (resp: JobSeekerPost[]): void => {
				console.log(resp);
				this.posts = resp;
				console.log(this.posts);
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

	public saveCandidate(userId: string, postId: string): void {
		this.r_service.saveCandidate(userId, postId).subscribe({
			next: (resp: any): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
				this.openSnackBar('Hmm, looks like the guy is already saved!');
			},
			complete: (): void => {
				console.info('completed');
				this.openSnackBar('Candidate was saved successfully!');
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

	public ascSort(): void {
		this.posts.sort((a, b) =>
			a.seeker.yearsOfExperience - b.seeker.yearsOfExperience
		);
	}

	public desecSort(): void {
		this.posts.sort((a, b) =>
			b.seeker.yearsOfExperience - a.seeker.yearsOfExperience
		);
	}

	public searchEntry(): void {
		const regex = /\b(Entry|Beginner)\b/i;
		this.posts = this.posts.filter(post =>
			regex.test(post.seeker.experienceLevel)
		);
		console.log(this.posts);
	}
	public searchJunior(): void {
		const regex = /\bJunior\b/i;
		this.posts = this.posts.filter(post =>
			regex.test(post.seeker.experienceLevel)
		);
		console.log(this.posts);
	}

	public searchSenior(): void {
		const regex = /\bSenior\b/i;
		this.posts = this.posts.filter(post =>
			regex.test(post.seeker.experienceLevel)
		);
		console.log(this.posts);
	}

	public search(): void {
		this.posts = this.posts.filter(post =>
			post.description.toLowerCase().includes(this.searchText.toLowerCase())
			|| post.title.toLowerCase().includes(this.searchText.toLowerCase())
			|| post.tags.some(tag =>
				tag.toLowerCase().includes(this.searchText.toLowerCase())
				|| tag.toLowerCase() === this.searchText.toLowerCase()
			)
		);
		console.log(this.posts);
	}

	public reloadList() {
		this.getPosts();
	}
}