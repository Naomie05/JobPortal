import { JobPost } from "./job-post";
import { JobSeeker } from "./job-seeker";

export class JobApplication {
	id: string = "";
	post!: JobPost;
	user!: JobSeeker;
	status: string = "";
	interviewLocation: string = "";
	interviewAccepted!: boolean;
}
