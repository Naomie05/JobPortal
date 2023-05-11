import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
	selector: 'app-admin-login',
	templateUrl: './admin-login.component.html',
	styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
	public user: User = new User();
	public form!: FormGroup;
	public password!: FormControl;
	public username!: FormControl;
	public isFormSubmitted: boolean = false;
	public message!: string;
	public validLogin: boolean = true;

	@Input() error: string | null | undefined;
	constructor(
		private _service: AdminService,
		private router: Router,
		private snackBar: MatSnackBar) {
		this.message = '';
	}
	public ngOnInit(): void {
		this.createControls();
		this.createForm();
	}

	public openSnackBar(): void {
		this.snackBar.open(`Hey ${this.user.username}! Your Login was successful ✅`, '', {
			duration: 5000
		});
	}

	public createControls(): void {
		this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
		this.username = new FormControl('', Validators.required);
	}

	public createForm(): void {
		this.form = new FormGroup({
			password: this.password,
			username: this.username,
		})
	}
	public login(): void {
		this.isFormSubmitted = true;
		if (this.password.value == null || this.username.value == null) {
			this.message = "User was not registered, Please enter valid details!"
		} else {
			this.user.password = this.password.value;
			this.user.username = this.username.value;
		}
		this._service.adminLogInFromBackend(this.user).subscribe({
			next: (resp: any): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
				this.validLogin = false;
				this.error = err.message;
			},
			complete: (): void => {
				console.info('completed');
				this.openSnackBar();
				this.router.navigate(['/admin/home']);
				this.validLogin = true;
			}
		});
	}
}