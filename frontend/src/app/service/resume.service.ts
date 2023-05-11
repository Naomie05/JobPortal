import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ResumeService {

	private url: string = 'http://localhost:8080';
	private api: string = `${this.url}/api/v2/resume`;

	constructor(private _http: HttpClient, private router: Router) { }

	public uploadResume(formData: FormData, id: string, jwt: string): Observable<any> {
		return this._http.post<any>(`${this.api}/upload/${id}`, formData, {
			headers: new HttpHeaders(
				{
					// 'Content-Type': 'multipart/form-data',
					'Authorization': jwt
				}
			)
		});
	}

	public getResume(id: string, jwt: string): Observable<any> {
		return this._http.get(`${this.api}/user/${id}/get`,{
				headers: new HttpHeaders(
					{
						'Authorization': jwt
					}
				)
			}
		);
	}
}
