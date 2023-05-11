import { Address } from "./address";
import { Company } from "./company";
import { User } from "./user";

export class Recruiter extends User {
	company: Company = {
		name: "",
		website: "",
		numberOfEmployee: "",
		description: "",
		address: new Address
	}
}
