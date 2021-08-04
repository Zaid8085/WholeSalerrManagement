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
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('Delete', 'delete', SpiColumnType.Icon),
    new SpiTableColumn('Position', 'Select_Category', SpiColumnType.Number),
    new SpiTableColumn('Name', 'Select_Sub_Category'),
    new SpiTableColumn('Product NAME', 'Product_name', SpiColumnType.Number),
    new SpiTableColumn('PRODUCT CODE', 'Product_code'),  
    new SpiTableColumn('BRAND', 'Brand'),  
    new SpiTableColumn('SKUS', 'SKUS'),  
    new SpiTableColumn('SELLING PRICE', 'Selling_price'),  
    new SpiTableColumn('COST PRICE', 'Cost_price'),  
    new SpiTableColumn('PROFIT', 'Profit'),  
    new SpiTableColumn('LOSS', 'Loss'),  
    new SpiTableColumn('GST', 'GST'),  
    new SpiTableColumn('TOTAL', 'Total'),  
    new SpiTableColumn('QUANTITY', 'Quantity'),  
    new SpiTableColumn('MRP', 'MRP'),  
    new SpiTableColumn('EXPIRY DATE', 'Expiry_date'),  
  ];
  tableData = [];
  spiTableSettings: any;
  productDetails: any[];
  constructor(private matDialog: MatDialog,private spiTableService: SpiTableService, private angularFirestore: AngularFirestore) { }

  ngOnInit() {    
    // this.spiTableService.setComponent(DemoChildComponent, 'spi-table-' + this.test);    
    
    this.getListOfProducts();
    this.tableData.length
  }

  detectChanges(event) {
    this.tableData = _.cloneDeep(event.tableData ? event.tableData : event);
  }

  getListOfProducts() {
    this.angularFirestore.collection('Product_List').snapshotChanges().subscribe(data => {
     console.log(data)
     this.tableData = [];
     this.spiTableSettings = undefined;
     data.forEach(e => {
       const obj = e.payload.doc.data();
       obj['delete'] = 'delete';
       obj['docId'] = e.payload.doc.id;
         this.tableData.push(obj);
     })
     setTimeout(() => {
      this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'product-details', false);
     }, 10);
     
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
    const msg = 'Are you sure you want to delete this expense? Click Yes to delete and No to cancel'
    let dialogProperty = new DialogProperty(new elementsConfig(true, msg), new elementsConfig(true, 'Yes'), new elementsConfig(true, 'No'))
    let dialogRef = this.matDialog.open(CommonDialogComponent, {
      data: dialogProperty
    })
    dialogRef.afterClosed().subscribe( result => {
      if(result) {
       this.angularFirestore.collection('Product_List').doc(docId).delete();
      }
    }) 
  }

  resizeTable() {
    const id = 'product-details';
    this.spiTableService._resizeTable(id);
  }
}
