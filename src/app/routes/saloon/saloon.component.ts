import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { SpiTableColumn } from 'src/app/shared/components/spi-tables/spi-table-column.model';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
import * as _ from 'lodash';
import { SpiTableSettings } from 'src/app/shared/components/spi-tables/Spi-table/Spi-table-settings.model';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DialogProperty, elementsConfig } from 'src/app/shared/components/common-dialog/Model/dialog-poperty';
@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.component.html',
  styleUrls: ['./saloon.component.scss']
})
export class SaloonComponent implements OnInit {
  date = new Date().getDay().toString() + '/' + new Date().getMonth().toString() + '/' + new Date().getFullYear().toString();
  saloonForm: FormGroup = this.fb.group({
    employeeName: ['', Validators.required,],
    serviceType: ['', Validators.required,],
    date: [Date.parse(this.date), Validators.required],
    amount: ['', Validators.required,],
    totalamount: ['', Validators.required,],
  });
  expenseTypes: any[] = [];
  isLoading: boolean;

  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Employee Name', 'employeeName', SpiColumnType.String),
    new SpiTableColumn('Service type', 'serviceType', SpiColumnType.String),
    new SpiTableColumn('Date', 'date', SpiColumnType.String),
    new SpiTableColumn('Amount', 'amount', SpiColumnType.Number),
    new SpiTableColumn('Total Amount', 'totalamount', SpiColumnType.Number),
  ];

  tableData = [];
  spiTableSettings: any;
  productDetails: any[];
  constructor(private matDialog: MatDialog ,private fb: FormBuilder, private angularFirestore: AngularFirestore, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    console.log(this.date)
    this.getDetailsOfEmployee();
    this.getListOfProducts();
  }

  getDetailsOfEmployee() {
    this.angularFirestore.collection('Salon_Service').snapshotChanges().subscribe(data => {
      console.log(data)
      this.expenseTypes = data.map(e => {
        return {
          id: e.payload.doc.id,
          value: e.payload.doc.data()
        } as any;
      })
    })
  }

  onSubmit() {
    this.angularFirestore.collection('Expenses').add(this.saloonForm.value).then( data => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Expense added successfully.',
          type: 'success',
        },
      });
      this.isLoading = false;
      this.saloonForm.reset();
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

  clear() {
    this.saloonForm.reset();
  }

  detectChanges(event) {
    this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
  }

  getListOfProducts() {
    this.angularFirestore.collection('Expenses').snapshotChanges().subscribe(data => {
     console.log(data)
     this.tableData = [];
     data.forEach(e => {
       const obj = e.payload.doc.data();
       obj['delete'] = 'delete';
       obj['docId'] = e.payload.doc.id;
         this.tableData.push(obj);
     })
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'expense-details', false);
   })    
 }
 
 deleteExpense(docId: any) {
   const msg = 'Are you sure you want to delete this expense? Click Yes to delete and No to cancel'
   let dialogProperty = new DialogProperty(new elementsConfig(true, msg), new elementsConfig(true, 'Yes'), new elementsConfig(true, 'No'))
   let dialogRef = this.matDialog.open(CommonDialogComponent, {
     data: dialogProperty
   })
   dialogRef.afterClosed().subscribe( result => {
     if(result) {
      this.angularFirestore.collection('Expenses').doc(docId).delete();
     }
   }) 
 }
}
