import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  studentForm: FormGroup = this.fb.group({
    name: ['', Validators.required,],
    address: ['', Validators.required,],
    date: ['', Validators.required,],
    school: ['', Validators.required,],
    email: ['',[ Validators.required,Validators.email]],
    center_location: ['', Validators.required,],
    select: ['', Validators.required,],
    favorite: ['', Validators.required,],
    favorite_movement: ['', Validators.required,],
    parent_name: ['', Validators.required,],
    parent_address: ['', Validators.required,],
    parent_email: ['',[ Validators.required,Validators.email]],
    primary_number: [ '' , [Validators.required,Validators.maxLength(10)]],
    secondary_number: ['', Validators.required,],
    emergency_contact: ['', Validators.required,],
    name_of_relation: ['', Validators.required,],
    packages: ['', Validators.required,],
    registration_amount: ['', Validators.required,],
    fee_amount: ['', Validators.required],
    payment_mode: [ '' ,Validators.required],
    discount: ['', Validators.required,],
    total_amount: ['', Validators.required,],
  });
  policies: any[];
  categories: any[];
  selectedSubCategory: any[] = [];
  selectedDocId: any;
  mesuaringUnits: any[] = [];
  isLoading: boolean;
  constructor(private fb: FormBuilder, public afAuth: AngularFirestore, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit() {
      console.warn(this.studentForm.value)
      this.isLoading = true;
      this.afAuth.collection('Student_Details').add(this.studentForm.value).then( data => {
        this.snackbar.openFromComponent(NotificationComponent, {
          data: {
            customMsg: 'Student Details Added successfully.',
            type: 'success',
          },
        });
        this.isLoading = false;
      }).catch(error => {
        this.snackbar.openFromComponent(NotificationComponent, {
          data: {
            customMsg: error.message,
            type: 'error',
            },
          });
        this.isLoading = false;
    })
  }
  clearInputMethod() {
    this.studentForm.reset()
  }
}
