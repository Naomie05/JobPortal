import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobSeeker } from 'src/app/class/job-seeker';
import { JobSeekerPost } from 'src/app/class/job-seeker-post';
import { JobSeekerService } from 'src/app/service/job-seeker.service';
import {ResumeService} from "../../../service/resume.service";

@Component({
	selector: 'app-job-seeker-resume',
	templateUrl: './job-seeker-resume.component.html',
	styleUrls: ['./job-seeker-resume.component.css']
})
export class JobSeekerResumeComponent implements OnInit {
	public resume: JobSeekerPost = new JobSeekerPost();
	public jobSeeker: JobSeeker = new JobSeeker();
	public resumeForm!: FormGroup;
	public title!: FormControl;
	public description!: FormControl;
	public attachment!: FormControl;
	public skills!: FormControl;
	// public tags!: FormControl;
	// public keywords!: FormControl;
	public tagsAsString!: FormControl;
	public keywordsAsString!: FormControl;
	public isFormSubmitted: boolean = false;
	public message!: string;
	public extractedTags: string = "";
	public extractedKeywords: string = "";
	private jwt: string = "";
	private currentFile!: File;
	public fileName = 'Select File';
	public progress = 0;
	public msg = '';


	constructor(
		private snackBar: MatSnackBar,
		private router: Router,
		private service: JobSeekerService,
		private r_service: ResumeService
	) {
		this.message = '';
	}

	// create controls before form (always),
	// otherwise, the app will have rendering problems
	public ngOnInit(): void {
		this.jobSeeker.id = this.service.getSignedinUserID();
		this.jobSeeker.username = this.service.getSignedinUsername();
		this.jwt = this.service.getToken();
		this.createControls();
		this.createForm();
	}

	public onFileSelected(event: any) {
		const file: File = event.target.files[0];
		const formData: FormData = new FormData();
		formData.append('file', file);
		this.r_service.uploadResume(formData, this.jobSeeker.id, this.jwt).subscribe({
			next: (resp) => console.log(resp),
			error: (err) => console.error(err),
			complete: (): void => {
				console.info('completed');
				//this.openSnackBar();
			}
		})
	}
	public openSnackBar(): void {
		this.snackBar.open(`Hey ${this.jobSeeker.username}! your post was created successfully ✅`, '', {
			duration: 5000
		});
	}

	public createControls(): void {
		this.description = new FormControl('', Validators.required);
		this.title = new FormControl('', Validators.required);
		this.attachment = new FormControl('', Validators.required);
		this.skills = new FormControl('', Validators.required);
		this.tagsAsString = new FormControl('', Validators.required);
		this.keywordsAsString = new FormControl('', Validators.required);
	}
	public createForm(): void {
		this.resumeForm = new FormGroup({
			description: this.description,
			title: this.title,
			attachment: this.attachment,
			skills: this.skills,
			tags: this.tagsAsString,
			keywords: this.keywordsAsString,
		});
	}
	public onSubmit(): void {
		this.isFormSubmitted = true;
		console.log("are you even working????? (from component)", this.jobSeeker);
		if (this.description.value == null ||
			this.title.value == null ||
			this.attachment.value == null ||
			this.skills.value == null ||
			this.tagsAsString.value == null ||
			this.keywordsAsString.value == null
		) {
			this.message = "Post was not created, Please enter valid details!"
		} else {
			this.extractedKeywords = this.keywordsAsString.value;
			this.extractedTags = this.tagsAsString.value;
			this.resume.description = this.description.value;
			this.resume.title = this.title.value;
			this.resume.attachment = this.attachment.value;
			this.resume.skills = this.skills.value;
			this.resume.tags = this.extractedTags.split(',').map(t => t.trim());
			this.resume.keywords = this.extractedKeywords.split(',').map(k => k.trim());
		}
		this.service.createPost(this.resume, this.jobSeeker.id).subscribe({
			next: (resp) => console.log(resp),
			error: (err) => console.error(err),
			complete: (): void => {
				console.info('completed');
				this.openSnackBar();
			}
		})
	}
}
