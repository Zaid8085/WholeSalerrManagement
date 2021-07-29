import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Component({
  selector: 'app-distributor-entry',
  templateUrl: './distributor-entry.component.html',
  styleUrls: ['./distributor-entry.component.scss']
})
export class DistributorEntryComponent implements OnInit {
  distributorform: FormGroup = this.fb.group({
    Distributor_Id: [ '' , [Validators.required,Validators.maxLength(50)]],
    Distributor_name: [ '' , [Validators.required,Validators.maxLength(50)]],
    address: [ '' , [Validators.required,Validators.maxLength(50)]],
    Mobile: [ '' , [Validators.required,Validators.maxLength(10)]],
    email: [ '' , [Validators.required,Validators.email]],
    dealer_person_name: [ '' , [Validators.required,Validators.maxLength(50)]],
    Product_MRP: ['', Validators.required],
    Product_amount: ['', Validators.required],
    Quantity: ['', Validators.required],    
    Total_Amount: ['', Validators.required],
    Selling_price: ['', Validators.required],
    Profit: ['', Validators.required],
    Purchase_Date: ['', Validators.required],    
    City: [ '' , [Validators.required,Validators.maxLength(50)]],
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
    console.warn(this.distributorform.value)
    this.isLoading = true;
    this.afAuth.collection('Distributor_Details').add(this.distributorform.value).then( data => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Distributor Details Added successfully.',
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
    this.distributorform.reset()
  }
}
