import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit {

 constructor(
    private snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data
  ) {
    this.data = data;
  }

  ngAfterViewInit(): void {
    this.setSnackbarBorder();
  }

  ngOnInit(): void { }

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
