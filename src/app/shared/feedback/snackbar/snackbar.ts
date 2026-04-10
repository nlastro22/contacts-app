import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarAction, MatSnackBarActions],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {
  snackBarRef = inject(MatSnackBarRef);

  data = inject(MAT_SNACK_BAR_DATA);
}
