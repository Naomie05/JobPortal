import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recruiter } from 'src/app/class/recruiter';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
	selector: 'app-recruiter-profile',
	templateUrl: './recruiter-profile.component.html',
	styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent {
	
	public user: Recruiter = new Recruiter();
	public editMode: boolean = false;
	constructor(private route: ActivatedRoute, private service: RecruiterService) {
		// this.user.name = this.route.snapshot.params['id']
	}
	public ngOnInit(): void {
		this.user.username = this.service.getSignedinUsername();
		this.user.id = this.service.getSignedinUserID();
		this.getProfile();
	}

	public reloadPage(): void {
		window.location.reload();
	}

	public getProfile(): void {
		this.service.getRecruiterProfileById(this.user.id).subscribe({
			next: (resp: Recruiter): void => {
				console.log(resp);
				// this.user = resp;
				// let address = resp['address'];
				// let company = resp['company']
				this.user.firstName = resp['firstName'];
				this.user.lastName = resp['lastName'];
				this.user.email = resp['email'];
				this.user.age = resp['age'];
				this.user.gender = resp['gender'];
				this.user.address.country = resp.address['country'];
				this.user.address.city = resp.address['city'];
				this.user.address.state = resp.address['state'];
				this.user.address.street = resp.address['street'];
				this.user.address.postalCode = resp.address['postalCode'];
				this.user.company.name = resp.company['name'];
				this.user.company.description = resp.company['description'];
				// this.user.company.address = company['address'];
				this.user.company.numberOfEmployee = resp.company['numberOfEmployee'];
				this.user.company.website = resp.company['website'];
			},
			error: (err): void => {
				console.error(err);

			},
			complete: (): void => {
				console.info('completed');
			}
		});
	}

	public updateProfile(): void {
		this.service.updateRecruiterProfile(this.user, this.user.id).subscribe({
			next: (resp: Recruiter): void => {
				console.log(resp);
			},
			error: (err): void => {
				console.error(err);
			},
			complete: (): void => {
				console.info('completed');
				this.reloadPage();
			}
		});
	}
}