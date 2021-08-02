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
  selector: 'app-distributor-details',
  templateUrl: './distributor-details.component.html',
  styleUrls: ['./distributor-details.component.scss']
})
export class DistributorDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Distributor Id', 'Distributor_Id', SpiColumnType.Number),
    new SpiTableColumn('Distributor name', 'Distributor_name'),
    new SpiTableColumn('address', 'address'),
    new SpiTableColumn('Mobile', 'Mobile', SpiColumnType.Number),  
    new SpiTableColumn('email', 'email'),  
    new SpiTableColumn('dealer person name', 'dealer_person_name'),  
    new SpiTableColumn('Product MRP', 'Product_MRP'),  
    new SpiTableColumn('Product amount', 'Product_amount'),  
    new SpiTableColumn('Quantity', 'Quantity'),  
    new SpiTableColumn('Total Amount', 'Total_Amount'),  
    new SpiTableColumn('Selling price', 'Selling_price'),  
    new SpiTableColumn('Profit', 'Profit'),  
    new SpiTableColumn('Purchase Date', 'Purchase_Date'),  
    new SpiTableColumn('City', 'City'),   
  ];
  tableData = [];
  spiTableSettings: any;
  distributorDetails: any[];
  constructor(private matDialog: MatDialog,private spiTableService: SpiTableService, private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfDistributor();
  }
  detectChanges(event) {
    this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
  }

  getDetailsOfDistributor() {
    this.angularFirestore.collection('Distributor_Details').snapshotChanges().subscribe(data => {
     console.log(data)
     this.tableData = [];
     data.forEach(e => {
       const obj = e.payload.doc.data();
       obj['delete'] = 'delete';
       obj['docId'] = e.payload.doc.id;
         this.tableData.push(obj);
     })
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'distributor-details', false);
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
     this.angularFirestore.collection('Distributor_Details').doc(docId).delete();
    }
  }) 
}

 resizeTable() {
   const id = 'distributor_details';
   this.spiTableService._resizeTable(id);
 }

}
