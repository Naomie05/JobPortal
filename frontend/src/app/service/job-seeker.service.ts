import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { JobPost } from "../class/job-post";
import { JobSeeker } from '../class/job-seeker';
import { JobSeekerPost } from '../class/job-seeker-post';
import { User } from '../class/user';

@Injectable({
	providedIn: 'root'
})
export class JobSeekerService {
	
	private url: string = 'http://localhost:8080';
	private _s_api: string = `${this.url}/api/v2/job-seeker`; 
	private _a_api: string = `${this.url}/api/v2/job-application`;
	private _p_api: string = `${this.url}/api/v2/seeker/post`;
	private _au_api: string = `${this.url}/api/v2/auth/users`

	private headers: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': this.getToken()
	});
	
	constructor(private _http: HttpClient, private router: Router) {
	}

	public createJobSeekerProfile(user: JobSeeker, id: string): Observable<any> {
		return this._http.patch<any>(`${this._s_api}/${id}/profile/create`, user, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public updateJobSeekerProfile(user: JobSeeker, id: string): Observable<JobSeeker> {
		return this._http.patch<JobSeeker>(`${this._s_api}/${id}/profile/update`, user, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public saveJobPost(userId: string, postId: string): Observable<any> {
		return this._http.post<any>(`${this._s_api}/${userId}/save/job-post/${postId}`, null,{
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public applyForJob(userId: string, postId: string): Observable<any> {
		return this._http.post<any>(`${this._a_api}/create/${postId}/seeker/${userId}`, {} ,{
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				},
			) 
		});
	}

	public deleteSavedJobPost(userId: string, postId: string): Observable<any> {
		return this._http.delete(`${this._s_api}/${userId}/delete/job-post/${postId}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public fetchSavedJobPosts(userId: string): Observable<JobPost[]> {
		return this._http.get<JobPost[]>(`${this._s_api}/${userId}/get/job-posts`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public createPost(user: JobSeekerPost, id: string): Observable<any> {
		return this._http.post<any>(`${this._p_api}/user/${id}/create`, user, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public deletePost(id: string): Observable<any> {
		return this._http.delete<any>(`${this._p_api}/user/${id}/delete`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public updatePost(post: JobSeekerPost, id: string): Observable<JobSeekerPost> {
		return this._http.patch<JobSeekerPost>(`${this._p_api}/user/${id}/update`, post, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public fetchPosts(): Observable<JobSeekerPost[]> {
		return this._http.get<JobSeekerPost[]>(`${this._p_api}/get`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public fetchPostsBySeekerID(id: string): Observable<JobSeekerPost[]> {
		return this._http.get<JobSeekerPost[]>(`${this._p_api}/user/${id}/get`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public getJobSeekerProfileById(id: string): Observable<JobSeeker> {
		return this._http.get<JobSeeker>(`${this._s_api}/get/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.getToken()
				}
			)
		});
	}

	public seekerRegisterFromBackend(user: User): Observable<any> {
		//console.log(user);
		return this._http.post<any>(`${this._au_api}/job-seeker/signup`, user, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		});
	}

	public jobSeekerLogInFromBackend(user: User): Observable<any> {
		//console.log(user);
		return this._http.post<any>(`${this._au_api}/job-seeker/login`, user, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		}).pipe(map((resp) => {
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
			localStorage.setItem('user_type', 'job-seeker');
			return resp;
		}));
	}

	public logOut(): void {
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
	public setSessionID(id: string) {
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