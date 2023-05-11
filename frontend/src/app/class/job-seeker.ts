import { Address } from "./address";
import { User } from "./user";

export class JobSeeker extends User {
	skills: string = "";
	yearsOfExperience: number = 0;
	certifications: string = "";
	education: string = "";
	experienceLevel: string = "";
	tags: string[] = [];
}
