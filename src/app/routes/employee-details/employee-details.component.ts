import { Component, OnInit } from '@angular/core';
import { SpiTableColumn } from 'src/app/shared/components/spi-tables/spi-table-column.model';
import { SpiTableService } from 'src/app/shared/components/spi-tables/spi-table.service';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
import * as _ from 'lodash'
import { SpiTableSettings } from 'src/app/shared/components/spi-tables/Spi-table/Spi-table-settings.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns = [
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
  constructor(private spiTableService: SpiTableService, public afAuth: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfEmployee();
  }
    getDetailsOfEmployee() {
    this.afAuth.collection('Employee_Details').snapshotChanges().subscribe(data => {
     console.log(data)
     data.map(e => {
         this.tableData.push(e.payload.doc.data());
     })
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'employee_details', false);
   })

   // this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'employee-details', true);      
 }

 checkboxchecked(checked: any) {
   alert(checked);
 }

 // This function is mandatory for every table
 detectChanges(event) {
   this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
 }

 expandAll() {
   for (let i = 0; document.querySelectorAll('#childrow').length; i++){
     setTimeout(() => {
       (document.querySelectorAll('#childrow')[i] as HTMLElement).click();
     }, 1000);
     
   }
 }

 resizeTable() {
   const id = 'employee_details';
   this.spiTableService._resizeTable(id);
 }
}
