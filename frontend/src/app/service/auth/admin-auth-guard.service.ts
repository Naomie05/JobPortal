import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminService } from '../admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

	constructor(private router: Router, private authService: AdminService) { }
	public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		boolean | UrlTree |
		Observable<boolean | UrlTree> |
		Promise<boolean | UrlTree> {
		if (!this.authService.isUserSignedin() || this.authService.getActiveUserType() != 'admin') {
			alert('You are not allowed to view this page');
			this.authService.logOut();
			this.router.navigate(["/login"], { queryParams: { retUrl: route.url } });
			return false;
		}
		return true;
	}
}
