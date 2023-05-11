import { Recruiter } from "./recruiter";

export class JobPost {
	id: string = "";
	recruiter!: Recruiter;
	title: string = "";
	createdAt: Date = new Date();
	description: string = "";
	salary: number = 0;
	responsabilites: string = "";
	expectations: string = "";
	location: string = "";
	role: string = "";
	status: string = "";
	keywords: string[] = [];
}
