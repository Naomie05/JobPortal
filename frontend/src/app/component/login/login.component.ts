import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../class/user';
import { Router } from '@angular/router';
import { JobSeekerService } from '../../service/job-seeker.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public user: User = new User();
    public form!: FormGroup;
    public password!: FormControl;
    public username!: FormControl;
    public isFormSubmitted: boolean = false;
    public message!: string;
    public validLogin: boolean = true;
    // public msg = `Hey ${this.user.username}! Your Login was successful`;
    @Input() error: string | null | undefined;
    constructor(
        private _service: JobSeekerService,
        private service: RecruiterService,
        private router: Router,
        private snackBar: MatSnackBar) {
        this.message = '';
    }
    public ngOnInit(): void {
        //this.userLogin();
        this.createControls();
        this.createForm();
    }

    public openSnackBar(): void {
        this.snackBar.open(`Hey ${this.user.username}! Your Login was successful ✅`, '', {
            duration: 5000
        });
    }

    public createControls(): void  {
        this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);
        this.username = new FormControl('', Validators.required);
    }

    public createForm(): void  {
        this.form = new FormGroup({
            password: this.password,
            username: this.username,
        })
    }
    public seekerLogin(): void {
        //console.log("are you even working????? (from component)", this.user);
        this.isFormSubmitted = true;
        console.log("are you even working????? (from component)", this.user);
        if (this.password.value == null || this.username.value == null) {
            this.message = "User was not registered, Please enter valid details!"
        } else {
            this.user.password = this.password.value;
            this.user.username = this.username.value;
        }
        this._service.jobSeekerLogInFromBackend(this.user).subscribe({
            next: (resp: any): void  => {
                console.log(resp);
                // this._s.getJobSeekerProfileById(resp['id'])
            },
            error: (err): void  => {
                console.error(err);
                this.validLogin = false;
                this.error = err.message;
            },
            complete: (): void  => {
                console.info('completed');
                this.openSnackBar();
                this.router.navigate(['/job-seeker-home/dashboard']);
                this.validLogin = true;
            }
        });

    }

    public recruiterLogin(): void {
        this.isFormSubmitted = true;
        console.log("are you even working????? (from component)", this.user);
        if (this.password.value == null || this.username.value == null) {
            this.message = "User was not registered, Please enter valid details!"
        } else {
            this.user.password = this.password.value;
            this.user.username = this.username.value;
        }
        this.service.jobRecruiterLogInFromBackend(this.user).subscribe({
            next: (resp: any): void  => {
                console.log(resp);
                // this._s.getJobSeekerProfileById(resp['id'])
                this.validLogin = true;
            },
            error: (err): void  => {
                console.error(err);
                this.validLogin = false;
                this.error = err.message;
            },
            complete: (): void  => {
                console.info('completed');
                this.openSnackBar();
                this.router.navigate(['/recruiter-home/recruiter-dashboard']);
                this.validLogin = true;
            }
        });
    }
}
