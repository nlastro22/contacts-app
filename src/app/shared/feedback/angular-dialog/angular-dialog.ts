import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-angular-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './angular-dialog.html',
  styleUrl: './angular-dialog.css',
})
export class AngularDialog {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
}
