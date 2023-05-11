import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { JobSeekerHomePageComponent } from './component/job-seeker/job-seeker-home-page/job-seeker-home-page.component';
// import { JobSeekerLoginComponent } from './component/job-seeker-login/job-seeker-login.component';
import { JobSeekerProfileComponent } from './component/job-seeker/job-seeker-profile/job-seeker-profile.component';
// import { JobSeekerSignupComponent } from './component/job-seeker-signup/job-seeker-signup.component';
import { LoginComponent } from './component/login/login.component';
import { RecruiterHomePageComponent } from './component/recruiter/recruiter-home-page/recruiter-home-page.component';
// import { RecruiterLoginComponent } from './component/recruiter-login/recruiter-login.component';
import { RecruiterProfileComponent } from './component/recruiter/recruiter-profile/recruiter-profile.component';
// import { RecruiterSignupComponent } from './component/recruiter-signup/recruiter-signup.component';
import { RegistrationComponent } from './component/registration/registration.component';
import {
	JobSeekerCreateProfileComponent
} from "./component/job-seeker/job-seeker-create-profile/job-seeker-create-profile.component";
import { RecruiterCreateProfileComponent } from './component/recruiter/recruiter-create-profile/recruiter-create-profile.component';
import { RecruiterAuthGuardService } from './service/auth/recruiter-auth-guard.service';
import { JobSeekerAuthGuardService } from './service/auth/job-seeker-auth-guard.service';
import { CreateJobPostComponent } from './component/recruiter/create-job-post/create-job-post.component';
import { JobSeekerResumeComponent } from './component/job-seeker/job-seeker-resume/job-seeker-resume.component';
import { JobOpportunitiesComponent } from './component/job-seeker/job-opportunities/job-opportunities.component';
import { CandidatesComponent } from './component/recruiter/candidates/candidates.component';
import { ShowJobPostComponent } from './component/recruiter/show-job-post/show-job-post.component';
import { ShowPostComponent } from './component/job-seeker/show-post/show-post.component';
import { SavedJobPostsComponent } from './component/job-seeker/saved-job-posts/saved-job-posts.component';
import { SavedCandidatesComponent } from './component/recruiter/saved-candidates/saved-candidates.component';
import { AppliedJobsComponent } from './component/job-seeker/applied-jobs/applied-jobs.component';
import { JobApplicationsComponent } from './component/recruiter/job-applications/job-applications.component';
import { JobOverviewComponent } from './component/job-seeker/job-overview/job-overview.component';
import { JobSeekerDashboardComponent } from './component/job-seeker/job-seeker-dashboard/job-seeker-dashboard.component';
import { RecruiterDashboardComponent } from './component/recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AdminCandidatesComponent } from './component/admin/admin-candidates/admin-candidates.component';
import { AdminRecruitersComponent } from './component/admin/admin-recruiters/admin-recruiters.component';
import { AdminJobSeekerPostsComponent } from './component/admin/admin-job-seeker-posts/admin-job-seeker-posts.component';
import { AdminJobPostsComponent } from './component/admin/admin-job-posts/admin-job-posts.component';
import { AdminJobApplicationsComponent } from './component/admin/admin-job-applications/admin-job-applications.component';
import { AdminAuthGuardService } from './service/auth/admin-auth-guard.service';

const routes: Routes = [
	{
		path: '', component: HomeComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegistrationComponent },
		]
	},
	{
		path: "job-seeker-home", component: JobSeekerHomePageComponent, canActivate: [JobSeekerAuthGuardService],
		children: [
			{ path: "job-seeker-profile", component: JobSeekerProfileComponent, canActivate: [JobSeekerAuthGuardService], },
			{ path: "job-seeker-create-profile", component: JobSeekerCreateProfileComponent, canActivate: [JobSeekerAuthGuardService], },
			{ path: "job-seeker-resume", component: JobSeekerResumeComponent, canActivate: [JobSeekerAuthGuardService], },
			{
				path: "job-opportunities", component: JobOpportunitiesComponent, canActivate: [JobSeekerAuthGuardService],
				// children: [
				// 	{ path: ":id", component: JobOverviewComponent, canActivate: [JobSeekerAuthGuardService], },
				// ]
			},
			{ path: "show-post", component: ShowPostComponent, canActivate: [JobSeekerAuthGuardService], },
			{ path: "saved-jobs", component: SavedJobPostsComponent, canActivate: [JobSeekerAuthGuardService], },
			{ path: "applied-jobs", component: AppliedJobsComponent, canActivate: [JobSeekerAuthGuardService], },
			{ path: "dashboard", component: JobSeekerDashboardComponent, canActivate: [JobSeekerAuthGuardService], },
		],
	},
	{
		path: "recruiter-home", component: RecruiterHomePageComponent, canActivate: [RecruiterAuthGuardService],
		children: [
			{ path: "recruiter-profile", component: RecruiterProfileComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "recruiter-create-profile", component: RecruiterCreateProfileComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "recruiter-create-post-job", component: CreateJobPostComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "candidates", component: CandidatesComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "job-posts", component: ShowJobPostComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "saved-candidates", component: SavedCandidatesComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "job-applications", component: JobApplicationsComponent, canActivate: [RecruiterAuthGuardService], },
			{ path: "recruiter-dashboard", component: RecruiterDashboardComponent, canActivate: [RecruiterAuthGuardService], }
		],

	},

	{
		path: "admin", component: AdminHomeComponent,
		children: [
			{ path: "login", component: AdminLoginComponent },
			{
				path: "home", component: DashboardComponent, canActivate: [AdminAuthGuardService],
				// children: [
				// 	{ path: "candidates", component: AdminCandidatesComponent },
				// 	{ path: "recruiters", component: AdminRecruitersComponent },
				// 	{ path: "resumes", component: AdminJobSeekerPostsComponent },
				// 	{ path: "job-posts", component: AdminJobPostsComponent }, 
				// 	{ path: "job-applications", component: AdminJobApplicationsComponent }
					
				// ]
			},
		],

	},

	// { path: "job-seeker-profile", component: JobSeekerProfileComponent },
	// { path: "job-seeker-login", component: JobSeekerLoginComponent },
	// { path: "job-seeker-signup", component: JobSeekerSignupComponent },
	// { path: "recruiter-signup", component: RecruiterSignupComponent },
	// { path: "recruiter-login", component: RecruiterLoginComponent },


];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
