import { Component, OnInit } from '@angular/core';
import { SpiTableColumn } from 'src/app/shared/components/spi-tables/spi-table-column.model';
import { SpiTableService } from 'src/app/shared/components/spi-tables/spi-table.service';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
import * as _ from 'lodash'
import { SpiTableSettings } from 'src/app/shared/components/spi-tables/Spi-table/Spi-table-settings.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CommonDialogComponent } from 'src/app/shared/components/common-dialog/common-dialog.component';
import { DialogProperty, elementsConfig } from 'src/app/shared/components/common-dialog/Model/dialog-poperty';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Name', 'name'),
    new SpiTableColumn('Address', 'address'),
    new SpiTableColumn('Date', 'date', SpiColumnType.Date),
    new SpiTableColumn('School', 'school'),
    new SpiTableColumn('Email', 'email'),
    new SpiTableColumn('Center_Location', 'center_location'),
    new SpiTableColumn('Select', 'select'),
    new SpiTableColumn('School', 'school'),
    new SpiTableColumn('Favorite', 'favorite'),
    new SpiTableColumn('Favorite Movement', 'favorite_movement'),
    new SpiTableColumn('Name', 'name'),
    new SpiTableColumn('Address', 'parent_address'),
    new SpiTableColumn('Email', 'parent_email'),
    new SpiTableColumn('Parent Number', 'primary_number'),
    new SpiTableColumn('Secondary Number', 'secondary_number'),
    new SpiTableColumn('Emergency Contact', 'emergency_contact'),
    new SpiTableColumn('Name Of Relation', 'name_of_relation'),
    new SpiTableColumn('Packages', 'packages'),
    new SpiTableColumn('Registration Amount', 'registration_amount'),
    new SpiTableColumn('Fee Amount','fee_amount'),
    new SpiTableColumn('Payment Mode','payment_mode'),
    new SpiTableColumn('Discount','discount'),
    new SpiTableColumn('Total Amount','total_amount'),
  ];
  tableData = [];
  spiTableSettings: any;
  studentDetails: any[];
  constructor(private matDialog: MatDialog,private spiTableService: SpiTableService, private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfStudent();
  }
  getDetailsOfStudent() {
    this.angularFirestore.collection('Student_Details').snapshotChanges().subscribe(data => {
      console.log(data)
      this.tableData = [];
      data.forEach(e => {
        const obj = e.payload.doc.data();
        obj['delete'] = 'delete';
        obj['docId'] = e.payload.doc.id;
        
          this.tableData.push(obj);
          console.log(this.tableData)
      })
      this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'student-details', false);
    })
  }
  checkboxchecked(checked: any) {
    alert(checked);
  }

  expandAll() {
    for (let i = 0; document.querySelectorAll('#childrow').length; i++){
      setTimeout(() => {
        (document.querySelectorAll('#childrow')[i] as HTMLElement).click();
      }, 1000);
      
    }
  }
  deleteExpense(docId: any) {
   const msg = 'Are you sure you want to delete'
   let dialogProperty = new DialogProperty(new elementsConfig(true, msg), new elementsConfig(true, 'Yes'), new elementsConfig(true, 'No'))
   let dialogRef = this.matDialog.open(CommonDialogComponent, {
     data: dialogProperty
   })
   dialogRef.afterClosed().subscribe( result => {
     if(result) {
      this.angularFirestore.collection('Student_Details').doc(docId).delete();
     }
   }) 
 }
 
  resizeTable() {
    const id = 'student_details';
    this.spiTableService._resizeTable(id);
  }
}
