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
  selector: 'app-diet-plan-settings',
  templateUrl: './diet-plan-settings.component.html',
  styleUrls: ['./diet-plan-settings.component.scss']
})
export class DietPlanSettingsComponent implements OnInit {
  dietplansettingsform: FormGroup = this.fb.group({
    meal_id: ['',Validators.required],
    meal_name: ['', Validators.required,],
  });
  expenseTypes: any[] = [];
  isLoading: boolean;
  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Meal Id', 'meal_id', SpiColumnType.Number),
    new SpiTableColumn('Meal Name', 'meal_name', SpiColumnType.String),
  ];
  tableData = [];
  spiTableSettings: any;
  dietDetails: any[];
  constructor(private matDialog: MatDialog ,private fb: FormBuilder, private angularFirestore: AngularFirestore, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getExpenseTypes();
    this.getListOfProducts();
  }
  getExpenseTypes() {
    this.angularFirestore.collection('Meal_Plans').snapshotChanges().subscribe(data => {
      console.log(data)
      this.getListOfProducts.length
      console.log(data.length);
      
      
      this.expenseTypes = data.map(e => {
        return {
          id: e.payload.doc.id,
          value: e.payload.doc.data()
        } as any;
      })
    })
  }

  onSubmit() {
    this.angularFirestore.collection('Meal_Plans').add(this.dietplansettingsform.value).then( data => {
      this.snackbar.openFromComponent(NotificationComponent, {
        data: {
          customMsg: 'Expense added successfully.',
          type: 'success',
        },
      });
      this.isLoading = false;
      this.dietplansettingsform.reset();
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
    this.dietplansettingsform.reset();
  }

  detectChanges(event) {
    this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
  }

  getListOfProducts() {
    this.angularFirestore.collection('Meal_Plans').snapshotChanges().subscribe(data => {
     console.log(data.length)
     this.tableData = [];
     data.forEach(e => {
       const obj = e.payload.doc.data();
       obj['delete'] = 'delete';
       obj['docId'] = e.payload.doc.id;
         this.tableData.push(obj);
     })
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'Meal_Plans', false);
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
      this.angularFirestore.collection('Meal_Plans').doc(docId).delete();
     }
   }) 
 }
}
