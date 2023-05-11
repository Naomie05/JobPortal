import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobPost } from '../class/job-post';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

	private url: string = 'http://localhost:8080';
	private _jp_api: string = `${this.url}/api/v2/job-post`;
	
	constructor(private _http: HttpClient, private router: Router) {
	}

	public createJobPost(post: JobPost, id: string, jwt: string): Observable<any> {
		return this._http.post<any>(`${this._jp_api}/user/${id}/create`, post, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	public updateJobPost(post: JobPost, id: string, jwt: string): Observable<JobPost> {
		return this._http.patch<JobPost>(`${this._jp_api}/user/${id}/update`, post, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	
	public fetchJobs(jwt : string): Observable<JobPost[]> {
		return this._http.get<JobPost[]>(`${this._jp_api}/get`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	public getJobPostById(jwt: string, id: string | null): Observable<JobPost> {
		return this._http.get<JobPost>(`${this._jp_api}/get/${id}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	public fetchJobsByRecruiterID(id: string, jwt: string): Observable<JobPost[]> {
		return this._http.get<JobPost[]>(`${this._jp_api}/user/${id}/get`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}
}
