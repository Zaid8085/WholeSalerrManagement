import { Component, OnInit } from '@angular/core';
import { SpiTableColumn } from 'src/app/shared/components/spi-tables/spi-table-column.model';
import { SpiTableService } from 'src/app/shared/components/spi-tables/spi-table.service';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
import * as _ from 'lodash'
import { SpiTableSettings } from 'src/app/shared/components/spi-tables/Spi-table/Spi-table-settings.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-distributor-details',
  templateUrl: './distributor-details.component.html',
  styleUrls: ['./distributor-details.component.scss']
})
export class DistributorDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('Distributor Id', 'Distributor_Id', SpiColumnType.Number),
    new SpiTableColumn('Distributor name', 'Distributor_name'),
    new SpiTableColumn('address', 'address', SpiColumnType.Number),
    new SpiTableColumn('Mobile', 'Mobile'),  
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
  productDetails: any[];
  constructor(private spiTableService: SpiTableService, public afAuth: AngularFirestore) { }

  ngOnInit(): void {
    this.getDetailsOfDistributor();
  }
  getDetailsOfDistributor() {
    this.afAuth.collection('Distributor_Details').snapshotChanges().subscribe(data => {
     console.log(data)
     data.map(e => {
         this.tableData.push(e.payload.doc.data());
     })
     this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'distributor-details', false);
   })

   // this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'distributor-details', true);      
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
   const id = 'distributor-details';
   this.spiTableService._resizeTable(id);
 }

}
