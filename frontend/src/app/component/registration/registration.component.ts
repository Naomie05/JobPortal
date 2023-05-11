import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { JobSeeker } from '../../class/job-seeker';
import { JobSeekerService } from '../../service/job-seeker.service';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	public user: User = new User();
	public form!: FormGroup;
	public firstName!: FormControl;
	public lastName!: FormControl;
	public password!: FormControl;
	public email!: FormControl;
	public username!: FormControl;
	public age!: FormControl;
	public gender!: FormControl;
	public country!: FormControl;
	public state!: FormControl;
	public city!: FormControl;
	public street!: FormControl;
	public postalcode!: FormControl;
	public isFormSubmitted: boolean = false;
	public message!: string;
	public REGEX_EMAIL = '[a-z0-9-_]+@[a-z0-9.]+[a-z]$';
	public REGEX_AGE = '^[0-9]{2}$';
	public REGEX_POSTAL_CODE = '^[0-9]{1,9}$'; // assuming longest postal code == 9 numbers
	public REGEX_OTHER = '^[a-zA-Z ]{1,50}$';
	public REGEX_STREET = '^[a-zA-Z0-9- ]*$';

	@Input() error: string | null | undefined;
	constructor(private snackBar: MatSnackBar, private router: Router, private _service: JobSeekerService, private service: RecruiterService) {
		this.message = '';
	}
	ngOnInit(): void {
		this.createControls();
		this.createForm();
	}
	public openSnackBar(message: string) {
		this.snackBar.open(message, '', {
			duration: 5000
		});
	}

	public createControls() {
		this.firstName = new FormControl('', Validators.required);
		this.lastName = new FormControl('', Validators.required);
		this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
		this.email = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_EMAIL)]);
		this.username = new FormControl('', Validators.required);
		this.gender = new FormControl('', Validators.required);
		this.age = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_AGE)]);
		this.country = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_OTHER)]);
		this.state = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_OTHER)]);
		this.city = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_OTHER)]);
		this.street = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_STREET)]);
		this.postalcode = new FormControl('', [Validators.required, Validators.pattern(this.REGEX_POSTAL_CODE)]);
	}

	public createForm() {
		this.form = new FormGroup({
			firstName: this.firstName,
			lastName: this.lastName,
			password: this.password,
			email: this.email,
			username: this.username,
			gender: this.gender,
			age: this.age,
			country: this.country,
			state: this.state,
			city: this.city,
			street: this.street,
			postalcode: this.postalcode,
		})
	}

	public registerSeeker(): void {
		this.isFormSubmitted = true;
		console.log("are you even working????? (from component)", this.user);
		if (this.firstName.value == null ||
			this.lastName.value == null ||
			this.password.value == null ||
			this.email.value == null ||
			this.username.value == null ||
			this.age.value == null ||
			this.gender.value == null ||
			this.country.value == null ||
			this.state.value == null ||
			this.city.value == null ||
			this.street.value == null ||
			this.postalcode.value == null
		) {
			this.message = "User was not registered, Please enter valid details!"
		} else {
			this.user.firstName = this.firstName.value;
			this.user.lastName = this.lastName.value;
			this.user.email = this.email.value;
			this.user.password = this.password.value;
			this.user.age = this.age.value;
			this.user.gender = this.gender.value;
			this.user.username = this.username.value;
			this.user.address.country = this.country.value;
			this.user.address.state = this.state.value;
			this.user.address.city = this.city.value;
			this.user.address.street = this.street.value;
			this.user.address.postalCode = this.postalcode.value;
		}
		this._service.seekerRegisterFromBackend(this.user).subscribe({
			next: (resp) => console.log(resp),
			error: (err) => {
				let e = err['error']
				console.error('HTTP Error', e['message']);
				let message = e['message'];
				this.openSnackBar(`${message}`);
			},
			complete: () => {
				console.info('completed');
				this.openSnackBar(`Hey ${this.user.username}! your Account was created successfully ✅`);
				this.router.navigate(['/login']);
			}
		})
	}

	public registerRecruiter(): void {
		this.isFormSubmitted = true;
		console.log("are you even working????? (from component)", this.user);
		if (this.firstName.value == null ||
			this.lastName.value == null ||
			this.password.value == null ||
			this.email.value == null ||
			this.username.value == null ||
			this.age.value == null ||
			this.gender.value == null ||
			this.country.value == null ||
			this.state.value == null ||
			this.city.value == null ||
			this.street.value == null ||
			this.postalcode.value == null
		) {
			this.message = "User was not registered, Please enter valid details!"
		} else {
			this.user.firstName = this.firstName.value;
			this.user.lastName = this.lastName.value;
			this.user.email = this.email.value;
			this.user.password = this.password.value;
			this.user.age = this.age.value;
			this.user.gender = this.gender.value;
			this.user.username = this.username.value;
			this.user.address.country = this.country.value;
			this.user.address.state = this.state.value;
			this.user.address.city = this.city.value;
			this.user.address.street = this.street.value;
			this.user.address.postalCode = this.postalcode.value;
		}
		console.log("are you even working????? (from component)", this.user);
		this.service.recruiterRegisterFromBackend(this.user).subscribe({
			next: (resp) => console.log(resp),
			error: (err) => {
				let e = err['error']
				console.error('HTTP Error', e['message']);
				let message = e['message'];
				this.openSnackBar(`${message}`);
			},
			complete: () => {
				console.info('completed');
				this.openSnackBar(`Hey ${this.user.username}! your Account was created successfully ✅`);
				this.router.navigate(['/login']);
			}
		})
	}
}