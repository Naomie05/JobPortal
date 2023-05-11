import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-post-dialog',
  templateUrl: './job-post-dialog.component.html',
  styleUrls: ['./job-post-dialog.component.css']
})
export class JobPostDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<JobPostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public post: any,
	) {
		this.post = post['post'];
	}
	public onCloselUserDialog(): void {
		this.dialogRef.close();
	}
}
