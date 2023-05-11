import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JobApplication } from '../class/job-application';
import { JobSeekerService } from './job-seeker.service';
import { RecruiterService } from './recruiter.service';

@Injectable({
	providedIn: 'root'
})
export class JobApplicationService {

	
	private url: string = 'http://localhost:8080';
	private _ja_api: string = `${this.url}/api/v2/job-application`;

	constructor(
		private _http: HttpClient,
		private router: Router,
		private s_service: JobSeekerService,
		private r_service: RecruiterService
	) {
	}

	public getJobApplications(): Observable<JobApplication[]> {
		return this._http.get<JobApplication[]>(`${this._ja_api}/get`, {
			headers: new HttpHeaders(
				{ 'Content-Type': 'application/json' }
			)
		});
	}
	
	public updateJobApplication(jwt: string, id: string, app: JobApplication): Observable<JobApplication> {
		return this._http.patch<JobApplication>(`${this._ja_api}/update/${id}`, app ,{
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	public getJobApplicationBySeeker(seekerId: string, jwt: string): Observable<JobApplication[]> {
		return this._http.get<JobApplication[]>(`${this._ja_api}/get/seeker/${seekerId}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}

	public getJobApplicationByRecruiter(recruiterId: string, jwt: string): Observable<JobApplication[]> {
		return this._http.get<JobApplication[]>(`${this._ja_api}/get/recruiter/${recruiterId}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': jwt
				}
			)
		});
	}
	public applyForJob(userId: string, postId: string): Observable<any> {
		return this._http.post<any>(`${this._ja_api}/create/${postId}/seeker/${userId}`, {
			headers: new HttpHeaders(
				{
					'Content-Type': 'application/json',
					'Authorization': this.s_service.getToken()
				}, 
			)
		});
	}
}
