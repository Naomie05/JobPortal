import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { JobSeeker } from '../class/job-seeker';
import { Recruiter } from '../class/recruiter';
import { JobPost } from '../class/job-post';
import { JobSeekerPost } from '../class/job-seeker-post';
import { JobApplication } from '../class/job-application';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

	private url: string = 'http://localhost:8080';
	private _api: string = `${this.url}/api/v2/admin`;
	private _au_api: string = `${this.url}/api/v2/auth/users`
	constructor(private _http: HttpClient, private router: Router) { }

	// public adminRegisterFromBackend(user: User): Observable<any> {
	// 	return this._http.post(`${this.apiUrl}/api/v2/auth/users/recruiter/signup`, user, {
	// 		headers: new HttpHeaders(
	// 			{ 'Content-Type': 'application/json' }
	// 		)
	// 	});
	// }

	public getJobSeekers(): Observable<JobSeeker[]> {
		return this._http.get<JobSeeker[]>(`${this._api}/get/candidates`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public deleteJobSeekerById(id: string): Observable<any> {
		return this._http.delete(`${this._api}/delete/candidate/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public getRecruiters(): Observable<Recruiter[]> {
		return this._http.get<Recruiter[]>(`${this._api}/get/recruiters`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public deleteRecruiterById(id: string): Observable<any> {
		return this._http.delete(`${this._api}/delete/recruiter/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public getJobPosts(): Observable<JobPost[]> {
		return this._http.get<JobPost[]>(`${this._api}/get/job-posts`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public deleteJobPostById(id: string): Observable<any> {
		return this._http.delete(`${this._api}/delete/job-post/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public getJobSeekerPosts(): Observable<JobSeekerPost[]> {
		return this._http.get<JobSeekerPost[]>(`${this._api}/get/seeker-posts`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public deleteJobSeekerPostById(id: string): Observable<any> {
		return this._http.delete(`${this._api}/delete/seeker-post/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public getJobApplications(): Observable<JobApplication[]> {
		return this._http.get<JobApplication[]>(`${this._api}/get/job-applications`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public deleteJobApplicationById(id: string): Observable<any> {
		return this._http.delete(`${this._api}/delete/job-application/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		})
	}

	public adminLogInFromBackend(user: User): Observable<any> {
		console.log(user);
		return this._http.post<any>(`${this._au_api}/admin/login`, user, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		}).pipe(map((resp) => {
			localStorage.setItem('user', resp['username']);
			localStorage.setItem('id', resp['id']);
			let tokenStr: string = 'Bearer ' + resp.token;
			localStorage.setItem('token', tokenStr);
			localStorage.setItem('user_type', 'admin');
			return resp;
		}));
	}

	public logOut() {
		this.router.navigate(['/admin/login']);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('user_type');
	}

	public isUserSignedin(): boolean {
		return localStorage.getItem('token') !== null;
	}

	public getSignedinUserID(): string {
		return localStorage.getItem('id') as string;
	}

	public setSessionID(id: string): void {
		localStorage.setItem('id', id);
	}

	public getSignedinUsername(): string {
		return localStorage.getItem('user') as string;
	}

	public getToken(): string {
		return localStorage.getItem('token') as string;
	}

	public getActiveUserType(): string {
		return localStorage.getItem('user_type') as string;
	}
}