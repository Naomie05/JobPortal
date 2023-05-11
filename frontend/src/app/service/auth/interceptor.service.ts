import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class InterceptorServiceService implements HttpInterceptor {

	constructor(private authService: AuthService, private router: Router) { }
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// TODO
		if (this.authService.isUserSignedin() && this.authService.getToken()) {
			const request = req.clone({
				headers: new HttpHeaders({
					'Authorization': 'Bearer ' + this.authService.getToken()
				}), withCredentials: true,
			});
			// TODO: handle if request == 401 (Forcefully signout)
			return next.handle(request).pipe(tap(() => { }, (err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			})
			);
		}
		return next.handle(req);
	}
}