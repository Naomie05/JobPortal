import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// private apiUrl = 'http://localhost:8080';
	constructor(private router: Router) { }
	public signout() {
		localStorage.removeItem('id');
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	public isUserSignedin() {
		// debug this later, try to clone the user from the storage 
		// and compare it against null val 
		return localStorage.getItem('token') === null;
	}

	public getSignedinUser() {
		return localStorage.getItem('user') as string;
	}

	public getToken() {
		return localStorage.getItem('token') as string;
	}
}