import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-job-app-dialog',
	templateUrl: './job-app-dialog.component.html',
	styleUrls: ['./job-app-dialog.component.css']
})
export class JobAppDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<JobAppDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public job: any,
	) {
		this.job = job['job'];
	}
	public onCloseDialog(): void {
		this.dialogRef.close();
	}
}
