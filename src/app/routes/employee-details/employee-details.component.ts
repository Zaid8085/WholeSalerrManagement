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
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Employee Picture', 'picture'),
    new SpiTableColumn('Employee Id', 'Employee_Id', SpiColumnType.Number),
    new SpiTableColumn('Employee name', 'Employee_name'),
    new SpiTableColumn('Employee role', 'Employee_role'),
    new SpiTableColumn('Address', 'Address'),  
    new SpiTableColumn('Email', 'Email'),  
    new SpiTableColumn('Mobile number', 'Mobile_number'),  
    new SpiTableColumn('Salary', 'Salary'),  
    new SpiTableColumn('Joining date', 'Joining_date',SpiColumnType.Date),  
    new SpiTableColumn('Aadhar card', 'Aadhar_card'),  
    new SpiTableColumn('Pan card', 'Pan_card'),     
  ];
  tableData = [];
  spiTableSettings: any;
  employeeDetails: any[];
  constructor(private matDialog: MatDialog,private spiTableService: SpiTableService, private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfEmployee();
  }
  detectChanges(event) {
    this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
  }

  getDetailsOfEmployee() {
    this.angularFirestore.collection('Employee_Details').snapshotChanges().subscribe(data => {

     this.tableData = [];
     data.forEach(e => {
       const obj = e.payload.doc.data();
       obj['delete'] = 'delete';
       obj['docId'] = e.payload.doc.id;
         this.tableData.push(obj);
     })
      console.log(this.tableData)
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'employee_details', false);
   })    
 }

 checkboxchecked(checked: any) {
   alert(checked);
 }

 // This function is mandatory for every table
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
     this.angularFirestore.collection('Employee_Details').doc(docId).delete();
      this.resizeTable()
    }
  }) 
}

 resizeTable() {
   const id = 'employee_details';
   this.spiTableService._resizeTable(id);
 }
}
