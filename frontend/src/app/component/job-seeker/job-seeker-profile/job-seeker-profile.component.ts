import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Address} from "../../../class/address";
import { JobSeeker } from '../../../class/job-seeker';
import { JobSeekerService } from '../../../service/job-seeker.service';

@Component({
	selector: 'app-job-seeker-profile',
	templateUrl: './job-seeker-profile.component.html',
	styleUrls: ['./job-seeker-profile.component.css']
})
export class JobSeekerProfileComponent implements OnInit {

	public user: JobSeeker = new JobSeeker();
	public form!: FormGroup;
	public firstNameControl!: FormControl;
	public lastNameControl!: FormControl;
	public emailControl!: FormControl;
	public ageControl!: FormControl;
	public genderControl!: FormControl;
	public countryControl!: FormControl;
	public stateControl!: FormControl;
	public cityControl!: FormControl;
	public streetControl!: FormControl;
	public postalcodeControl!: FormControl;
	public skillsControl!: FormControl;
	public yearsOfExperienceControl!: FormControl;
	public certificationsControl!: FormControl;
	public experienceLevelControl!: FormControl;
	public educationControl!: FormControl;
	public tagsAsStringControl!: FormControl;
	public REGEX_EMAIL: string = '[a-z0-9-_]+@[a-z0-9.]+[a-z]$';
	public REGEX_AGE: string = '^[0-9]{2}$';
	public REGEX_POSTAL_CODE: string = '^[0-9]{1,9}$'; // assuming longest postal code == 9 numbers
	public REGEX_OTHER: string = '^[a-zA-Z ]{1,50}$';
	public REGEX_STREET: string = '^[a-zA-Z0-9- ]*$';
	public editMode: boolean = false;
	public isFormSubmitted: boolean = false;
	public message!: string;
	public extractedTags: string = "";

	constructor(private route: ActivatedRoute, private service: JobSeekerService) {
		// this.user.name = this.route.snapshot.params['id']
	}
	public ngOnInit(): void {
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
		this.getProfile();
	}

	public createControls(): void {
		this.firstNameControl = new FormControl();
		this.lastNameControl = new FormControl();
		this.emailControl = new FormControl('',Validators.pattern(this.REGEX_EMAIL));
		this.genderControl = new FormControl('');
		this.ageControl = new FormControl(Validators.pattern(this.REGEX_AGE));
		this.countryControl = new FormControl(Validators.pattern(this.REGEX_OTHER));
		this.stateControl = new FormControl('', Validators.pattern(this.REGEX_OTHER));
		this.cityControl = new FormControl('',  Validators.pattern(this.REGEX_OTHER));
		this.streetControl = new FormControl('', Validators.pattern(this.REGEX_STREET));
		this.postalcodeControl = new FormControl('', Validators.pattern(this.REGEX_POSTAL_CODE));
		this.skillsControl = new FormControl();
		this.yearsOfExperienceControl = new FormControl();
		this.educationControl = new FormControl();
		this.experienceLevelControl = new FormControl();
		this.certificationsControl = new FormControl();
		this.tagsAsStringControl = new FormControl();
	}

	public createForm(): void {
		this.form = new FormGroup({
			firstName: this.firstNameControl,
			lastName: this.lastNameControl,
			email: this.emailControl,
			gender: this.genderControl,
			age: this.ageControl,
			country: this.countryControl,
			state: this.stateControl,
			city: this.cityControl,
			street: this.streetControl,
			postalcode: this.postalcodeControl,
			skills: this.skillsControl,
			yearsOfExperience: this.yearsOfExperienceControl,
			education: this.educationControl,
			experienceLevel: this.experienceLevelControl,
			certifications: this.certificationsControl,
			tagsAsString: this.tagsAsStringControl,
		})
	}
	public reloadPage(): void {
		window.location.reload();
	}
	public getProfile(): void {
		this.service.getJobSeekerProfileById(this.user.id).subscribe({
			next: (resp: JobSeeker): void => {
				// this.user = resp;
				console.log(resp.address.city);
				//let address: Address = resp['address'];
				this.user.firstName = resp['firstName'];
				this.user.lastName = resp['lastName'];
				this.user.email = resp['email'];
				this.user.age = resp['age'];
				this.user.gender = resp['gender'];
				this.user.certifications = resp['certifications'];
				this.user.education = resp['education'];
				this.user.yearsOfExperience = resp['yearsOfExperience'];
				this.user.tags = resp['tags'];
				this.user.experienceLevel = resp['experienceLevel'];
				this.user.skills = resp['skills'];
				this.user.address.country = resp.address['country'];
				this.user.address.city = resp.address['city'];
				this.user.address.state = resp.address['state'];
				this.user.address.street = resp.address['street'];
				this.user.address.postalCode = resp.address['postalCode'];
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
			}
		});
	}
	public updateProfile(): void {
		this.service.updateJobSeekerProfile(this.user, this.user.id).subscribe({
			next: (resp: JobSeeker): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.reloadPage();
			}
		});
	}
}