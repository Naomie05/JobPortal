import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobPost } from 'src/app/class/job-post';
import { Recruiter } from 'src/app/class/recruiter';
import { JobPostService } from 'src/app/service/job-post.service';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
	selector: 'app-job-post',
	templateUrl: './create-job-post.component.html',
	styleUrls: ['./create-job-post.component.css']
})
export class CreateJobPostComponent implements OnInit {
	//public user: Recruiter = new Recruiter();
	public post: JobPost = new JobPost();
	public jobPostForm!: FormGroup;
	public title!: FormControl;
	public description!: FormControl;
	public salary!: FormControl;
	public responsabilites!: FormControl;
	public expectations!: FormControl;
	public location!: FormControl;
	public role!: FormControl;
	public status!: FormControl;
	public keywordsAsString!: FormControl;
	public isFormSubmitted: boolean = false;
	public message!: string;
	public extractedString: string = "";
	private jwt: string = '';
	public id: string = '';
	public username: string = '';

	constructor(
		private snackBar: MatSnackBar,
		private router: Router,
		private _service: RecruiterService,
		private j_service: JobPostService) {
		this.message = '';
	}
	// create controls before form (always), 
	// otherwise, the app will have rendering problems
	public ngOnInit(): void {
		this.jwt = this._service.getToken();
		this.id = this._service.getSignedinUserID();
		this.username = this._service.getSignedinUsername();
		this.createControls();
		this.createForm();
	}
	public openSnackBar(): void {
		this.snackBar.open(`Hey ${this.username}! your post was created successfully ✅`, '', {
			duration: 5000
		});
	}

	public createControls(): void {
		this.description = new FormControl('', Validators.required);
		this.title = new FormControl('', Validators.required);
		this.salary = new FormControl('', Validators.required);
		this.responsabilites = new FormControl('', Validators.required);
		this.expectations = new FormControl('', Validators.required);
		this.location = new FormControl('', Validators.required);
		this.role = new FormControl('', Validators.required);
		this.keywordsAsString = new FormControl('', Validators.required);
		this.status = new FormControl('', Validators.required);
	}

	public createForm(): void {
		this.jobPostForm = new FormGroup({
			description: this.description,
			title: this.title,
			salary: this.salary,
			responsabilites: this.responsabilites,
			expectations: this.expectations,
			location: this.location,
			role: this.role,
			keywordsAsString: this.keywordsAsString,
			status: this.status,
		})
	}

	public onSubmit(): void {
		this.isFormSubmitted = true;
		if (this.description.value == null ||
			this.title.value == null ||
			this.salary.value == null ||
			this.responsabilites.value == null ||
			this.expectations.value == null ||
			this.location.value == null ||
			this.role.value == null ||
			this.status.value == null ||
			this.keywordsAsString.value == null
		) {
			this.message = "Post was not created, Please enter valid details!"
		} else {
			this.extractedString = this.keywordsAsString.value;
			this.post.description = this.description.value;
			this.post.title = this.title.value;
			this.post.salary = this.salary.value;
			this.post.responsabilites = this.responsabilites.value;
			this.post.expectations = this.expectations.value;
			this.post.location = this.location.value;
			this.post.role = this.role.value;
			this.post.status = this.status.value;
			this.post.keywords = this.extractedString.split(',').map(keyword => keyword.trim());
		}
		this.j_service.createJobPost(this.post, this.id, this.jwt).subscribe({
			next: (resp) => console.log(resp),
			error: (err) => console.error(err),
			complete: (): void => {
				console.info('completed');
				this.openSnackBar();
			}
		})
	}
}