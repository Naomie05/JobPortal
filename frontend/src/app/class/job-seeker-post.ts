import { JobSeeker } from "./job-seeker";

export class JobSeekerPost {
	id: string = "";
	seeker!: JobSeeker;
	title: string = "";
	description: string = "";
	// TODO:
	// this is meant to be a pdf resume
	// will figure how to do it later
	attachment: string = "";
	skills: string = "";
	tags: string[] = [];
	keywords: string[] = [];
}