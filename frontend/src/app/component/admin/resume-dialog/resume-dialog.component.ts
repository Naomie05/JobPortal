import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resume-dialog',
  templateUrl: './resume-dialog.component.html',
  styleUrls: ['./resume-dialog.component.css']
})
export class ResumeDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<ResumeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public post: any,
	) {
		this.post = post['post'];
	}
	public onCloselUserDialog(): void {
		this.dialogRef.close();
	}
}
