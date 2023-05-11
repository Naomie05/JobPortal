import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JobSeekerService } from '../job-seeker.service';

@Injectable({
	providedIn: 'root'
})
export class JobSeekerAuthGuardService implements CanActivate {

	constructor(private router: Router, private authService: JobSeekerService) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		boolean | UrlTree |
		Observable<boolean | UrlTree> |
		Promise<boolean | UrlTree> {
		if (!this.authService.isUserSignedin() || this.authService.getActiveUserType() !== 'job-seeker') {
			alert('You are not allowed to view this page');
			this.authService.logOut();
			this.router.navigate(["/login"], { queryParams: { retUrl: route.url } });
			return false;
		}
		return true;
	}
}
