import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.scss'],
})
export class SuccessSnackbarComponent implements OnInit, AfterViewInit {
  constructor(
    private snackBarRef: MatSnackBarRef<SuccessSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data
  ) {
    this.data = data;
  }

  ngAfterViewInit(): void {
    this.setSnackbarBorder();
  }

  ngOnInit(): void {}

  closeSnackbar() {
    this.snackBarRef.dismiss();
  }

  setSnackbarBorder() {
    if (this.data.type === 'error') {
      document
        .getElementsByClassName('mat-snack-bar-container')[0]
        .classList.add('error-border');
    }
  }
}
