import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecruiterService } from '../recruiter.service';

@Injectable({
	providedIn: 'root'
})
export class RecruiterAuthGuardService implements CanActivate {

	constructor(private router: Router, private authService: RecruiterService) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		boolean | UrlTree |
		Observable<boolean | UrlTree> |
		Promise<boolean | UrlTree> {
		if (!this.authService.isUserSignedin() || this.authService.getActiveUserType() !== 'recruiter') {
			alert('You are not allowed to view this page');
			this.authService.logOut(); // in case job seeker wanted to access recruiters page, kick'em Out
			this.router.navigate(["/login"], { queryParams: { retUrl: route.url } });
			return false;
		}
		return true;
	}
}
