// export class Address {
// 	//id!: number;
// 	country: string = "";
// 	state: string = "";
// 	postalCode: string = "";
// 	city: string = "";
// 	street: string = "";
// }

import { Address } from "./address";

export class User {
	id: string = "";
	firstName: string = "";
	lastName: string = "";
	email: string = "";
	password: string = "";
	username: string = "";
	gender: string = "";
	age: string = "";
	address: Address = {
		country: "",
		state: "",
		city: "",
		postalCode: "",
		street: "",
		//id: 0
	};
}
