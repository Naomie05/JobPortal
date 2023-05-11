import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { JobPost } from '../class/job-post';
import { JobSeekerPost } from '../class/job-seeker-post';
import { Recruiter } from '../class/recruiter';
import { User } from '../class/user';

@Injectable({
	providedIn: 'root'
})
export class RecruiterService {

	private url: string = 'http://localhost:8080';
	private _r_api: string = `${this.url}/api/v2/recruiter`;
	private _au_api: string = `${this.url}/api/v2/auth/users`
	
	constructor(private _http: HttpClient, private router: Router) {
	}

	public saveCandidate(userId: string, postId: string): Observable<any> {
		return this._http.post<any>(`${this._r_api}/${userId}/save/seeker-post/${postId}`, null, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public fetchSavedCandidates(userId: string): Observable<JobSeekerPost[]> {
		return this._http.get<JobSeekerPost[]>(`${this._r_api}/${userId}/get/seeker-posts`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}


	public createRecruiterProfile(user: Recruiter, id: string): Observable<Recruiter> {
		return this._http.patch<Recruiter>(`${this._r_api}/${id}/profile/create`, user, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public updateRecruiterProfile(user: Recruiter, id: string): Observable<Recruiter> {
		return this._http.patch<Recruiter>(`${this._r_api}/${id}/profile/update`, user, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public getRecruiterProfileById(id: string): Observable<any> {
		return this._http.get(`${this._r_api}/get/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public recruiterRegisterFromBackend(user: User): Observable<any> {
		//console.log(user);
		return this._http.post(`${this._au_api}/recruiter/signup`, user, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		});
	}

	public jobRecruiterLogInFromBackend(user: User): Observable<any> {
		console.log(user);
		return this._http.post<any>(`${this._au_api}/recruiter/login`, user, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		}).pipe(map((resp) => {
			// TODO: extract session info from Backend responce
			/* example of backend resopnse to a login request
			{
			  "id": 9,
			  "username": "testuser",
			  "email": "test@test",
			  "token": "eyJhbGciOiJIUzI1NiJ9.eyJyb2xl.....",
			  "password": "$2a$10$v3AxRAiWDvitexqukTCPrOmCP/Ys0KM1R0rn6o3/wqxAJdhA3rERm",
			  "role": "USER_ROLE"
			}
			we want to extract token, id, username from the response
			and add them to the local storage
			*/
			// localStorage.setItem(key, value) like map.put in JAVA
			localStorage.setItem('user', resp['username']);
			localStorage.setItem('id', resp['id']);
			let tokenStr: string = 'Bearer ' + resp.token;
			localStorage.setItem('token', tokenStr);
			localStorage.setItem('user_type', 'recruiter');
			return resp;
		}));
	}

	public logOut() {
		// if user log out, redirect to /login page
		this.router.navigate(['/login']);
		// then delete session cache in browser
		// NOTE: most browsers give you 10MB of storage for sessions
		// 10 MB should be enough
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('user_type');
	}

	// if token isn't found, user is not signed in
	public isUserSignedin(): boolean {
		return localStorage.getItem('token') !== null;
	}

	// self Explanatory
	public getSignedinUserID(): string {
		return localStorage.getItem('id') as string;
	}

	// self Explanatory
	public setSessionID(id: string): void {
		localStorage.setItem('id', id);
	}

	// self Explanatory
	public getSignedinUsername(): string {
		return localStorage.getItem('user') as string;
	}

	// self Explanatory
	public getToken(): string {
		return localStorage.getItem('token') as string;
	}

	public getActiveUserType(): string {
		return localStorage.getItem('user_type') as string;
	}
}