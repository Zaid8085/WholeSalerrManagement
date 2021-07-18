import { Component, OnInit ,NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import {
  MatSnackBar,
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  imagePath = '../../../assets/images/concept-mechanism-product-management-businessman-showing-open-box-blurred-background-169681095.jpeg';
  emailId: any;
  password: any;

  constructor(public afAuth: AngularFireAuth, private snackbar: MatSnackBar, private route: Router ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.emailId + ' ' + this.password)
    this.afAuth.signInWithEmailAndPassword(this.emailId, this.password).then((data) => {
      console.log(data)
      this.route.navigate(['./layout']);
      sessionStorage.setItem('user', this.emailId);
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Welcome, you are successfully logged In.',
          type: 'success',
        },
      });
  }).catch(error => {
          this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: error.message,
          type: 'error',
        },
      });
  })
  }
}
