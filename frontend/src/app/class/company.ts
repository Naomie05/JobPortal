import { Address } from "./address";

export class Company {
	name: string = "";
	website: string = "";
	numberOfEmployee: string = "";
	description: string = "";
	address: Address = {
		country: "",
		state: "",
		city: "",
		postalCode: "",
		street: "",
		//id: 0
	};

}
