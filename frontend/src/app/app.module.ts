import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { RecruiterHomePageComponent } from './component/recruiter/recruiter-home-page/recruiter-home-page.component';
import { JobSeekerHomePageComponent } from './component/job-seeker/job-seeker-home-page/job-seeker-home-page.component';
import { RecruiterProfileComponent } from './component/recruiter/recruiter-profile/recruiter-profile.component';
import { JobSeekerProfileComponent } from './component/job-seeker/job-seeker-profile/job-seeker-profile.component';
// import { JobSeekerLoginComponent } from './component/job-seeker-login/job-seeker-login.component';
// import { JobSeekerSignupComponent } from './component/job-seeker-signup/job-seeker-signup.component';
// import { RecruiterSignupComponent } from './component/recruiter-signup/recruiter-signup.component';
// import { RecruiterLoginComponent } from './component/recruiter-login/recruiter-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
	JobSeekerCreateProfileComponent
} from './component/job-seeker/job-seeker-create-profile/job-seeker-create-profile.component';
import {
	RecruiterCreateProfileComponent
} from './component/recruiter/recruiter-create-profile/recruiter-create-profile.component';
import { AuthService } from './service/auth/auth.service';
import { RecruiterAuthGuardService } from './service/auth/recruiter-auth-guard.service';
import { JobSeekerAuthGuardService } from './service/auth/job-seeker-auth-guard.service';
import { CreateJobPostComponent } from './component/recruiter/create-job-post/create-job-post.component';
import { JobSeekerResumeComponent } from './component/job-seeker/job-seeker-resume/job-seeker-resume.component';
import { JobOpportunitiesComponent } from './component/job-seeker/job-opportunities/job-opportunities.component';
import { CandidatesComponent } from './component/recruiter/candidates/candidates.component';
import { ShowJobPostComponent } from './component/recruiter/show-job-post/show-job-post.component';
import { ShowPostComponent } from './component/job-seeker/show-post/show-post.component';
import { UpdatePostDialogComponent } from './component/recruiter/update-post-dialog/update-post-dialog.component';
import {
	UpdateSeekerPostDialogComponent
} from './component/job-seeker/update-seeker-post-dialog/update-seeker-post-dialog.component';
import { JobOverviewComponent } from './component/job-seeker/job-overview/job-overview.component';
import { SavedJobPostsComponent } from './component/job-seeker/saved-job-posts/saved-job-posts.component';
import { SavedCandidatesComponent } from './component/recruiter/saved-candidates/saved-candidates.component';
import { AppliedJobsComponent } from './component/job-seeker/applied-jobs/applied-jobs.component';
import { JobApplicationsComponent } from './component/recruiter/job-applications/job-applications.component';
import { ReviewJobApplicationComponent } from './component/recruiter/review-job-application/review-job-application.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { JobSeekerDashboardComponent } from './component/job-seeker/job-seeker-dashboard/job-seeker-dashboard.component';
import { RecruiterDashboardComponent } from './component/recruiter/recruiter-dashboard/recruiter-dashboard.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminCandidatesComponent } from './component/admin/admin-candidates/admin-candidates.component';
import { AdminRecruitersComponent } from './component/admin/admin-recruiters/admin-recruiters.component';
import { AdminJobPostsComponent } from './component/admin/admin-job-posts/admin-job-posts.component';
import { AdminJobSeekerPostsComponent } from './component/admin/admin-job-seeker-posts/admin-job-seeker-posts.component';
import { AdminJobApplicationsComponent } from './component/admin/admin-job-applications/admin-job-applications.component';
import { JobPostDialogComponent } from './component/admin/job-post-dialog/job-post-dialog.component';
import { JobAppDialogComponent } from './component/admin/job-app-dialog/job-app-dialog.component';
import { SeekerDialogComponent } from './component/admin/seeker-dialog/seeker-dialog.component';

import { RecruiterDialogComponent } from './component/admin/recruiter-dialog/recruiter-dialog.component';
import { ResumeDialogComponent } from './component/admin/resume-dialog/resume-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		RegistrationComponent,
		RecruiterHomePageComponent,
		JobSeekerHomePageComponent,
		RecruiterProfileComponent,
		JobSeekerProfileComponent,
		JobSeekerCreateProfileComponent,
		RecruiterCreateProfileComponent,
		CreateJobPostComponent,
		JobSeekerResumeComponent,
		JobOpportunitiesComponent,
		CandidatesComponent,
		ShowJobPostComponent,
		ShowPostComponent,
		UpdatePostDialogComponent,
		UpdateSeekerPostDialogComponent,
		JobOverviewComponent,
		SavedJobPostsComponent,
		SavedCandidatesComponent,
		AppliedJobsComponent,
		JobApplicationsComponent,
		ReviewJobApplicationComponent,
		JobSeekerDashboardComponent,
  	RecruiterDashboardComponent,
		DashboardComponent,
		AdminHomeComponent,
		AdminLoginComponent,
		AdminCandidatesComponent,
		AdminRecruitersComponent,
		AdminJobPostsComponent,
		AdminJobSeekerPostsComponent,
		AdminJobApplicationsComponent,
		JobPostDialogComponent,
		JobAppDialogComponent,
		SeekerDialogComponent,
		ResumeDialogComponent,
		RecruiterDialogComponent,
		// JobSeekerLoginComponent,
		// JobSeekerSignupComponent,
		// RecruiterSignupComponent,
		// RecruiterLoginComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		FlexLayoutModule,
		MatRadioModule,
		MatSliderModule,
		MatSidenavModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatListModule,
		MatCardModule,
		MatProgressBarModule,
		MatInputModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatTableModule,
		MatDialogModule,
		MatTabsModule,
		MatDividerModule,
		MatTooltipModule,
		MatSelectModule,
		MatPaginatorModule,
		MatChipsModule,
		CommonModule,
		MatButtonToggleModule,
		MatSlideToggleModule,
		MatBadgeModule,
		MatCheckboxModule,
		MatMenuModule,
		MatExpansionModule,
		DragDropModule,
		MatSortModule,
		MatGridListModule,
		MatStepperModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		ClipboardModule,
	],
	providers: [
		RecruiterAuthGuardService,
		JobSeekerAuthGuardService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
