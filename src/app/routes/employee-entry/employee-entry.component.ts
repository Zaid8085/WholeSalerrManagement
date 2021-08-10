import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-employee-entry',
  templateUrl: './employee-entry.component.html',
  styleUrls: ['./employee-entry.component.scss']
})
export class EmployeeEntryComponent implements OnInit {

  employeeform: FormGroup = this.fb.group({
    Employee_Id: [ '' ,Validators.required,Validators.minLength(3)],
    Employee_name: [ '' , Validators.required],
    Employee_role: [ '' , Validators.required],
    Address: [ '' , Validators.required],
    Email: [ '' ,[ Validators.required,Validators.email]],
    Mobile_number: [ '' , Validators.required],
    Salary: [ '' , Validators.required],
    Joining_date: [ '' , Validators.required],
    Aadhar_card: [ '' ,Validators.required],
    Pan_card: [ '' , Validators.required],
    picture: ''
  });
  policies: any[];
  categories: any[];
  selectedSubCategory: any[] = [];
  selectedDocId: any;
  mesuaringUnits: any[] = [];
  isLoading: boolean;
  imgFile: string;
  downloadURL: any;
  constructor(private fb: FormBuilder, public afAuth: AngularFirestore, private fireStorage: AngularFireStorage, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.employeeform.value)
    this.isLoading = true;
    this.afAuth.collection('Employee_Details').add(this.employeeform.value).then( data => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Employee details added successfully.',
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

  clearInputMethod1() {
    this.employeeform.reset()
  }

  onImageChange(e) {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const filePath = `wholesalerrManagement/profilePictures/${this.employeeform.controls['Employee_name'].value}`;
      const fileRef = this.fireStorage.ref(filePath);
      const task = this.fireStorage.upload(`wholesalerrManagement/profilePictures/${this.employeeform.controls['Employee_name'].value}`, file);
      task
        .snapshotChanges()
        .subscribe(url => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.employeeform.controls['picture'].setValue(url)
            }
          });
        });
    }
  }
}
