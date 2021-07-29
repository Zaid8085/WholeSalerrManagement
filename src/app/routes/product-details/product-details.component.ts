import { Component, OnInit } from '@angular/core';
import { SpiTableColumn } from 'src/app/shared/components/spi-tables/spi-table-column.model';
import { SpiTableService } from 'src/app/shared/components/spi-tables/spi-table.service';
import { SpiColumnType } from 'src/app/shared/components/spi-tables/spi-table/spi-column-type.model';
import * as _ from 'lodash'
import { SpiTableSettings } from 'src/app/shared/components/spi-tables/Spi-table/Spi-table-settings.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  displayedColumns = [
    new SpiTableColumn('POSITION', 'Select_Category', SpiColumnType.Number),
    new SpiTableColumn('NAME', 'Select_Sub_Category'),
    new SpiTableColumn('WEIGHT', 'Product_name', SpiColumnType.Number),
    new SpiTableColumn('SYMBOL', 'Product_code'),  
    new SpiTableColumn('SYMBOL', 'Brand'),  
    new SpiTableColumn('SYMBOL', 'SKUS'),  
    new SpiTableColumn('SYMBOL', 'Selling_price'),  
    new SpiTableColumn('SYMBOL', 'Cost_price'),  
    new SpiTableColumn('SYMBOL', 'Profit'),  
    new SpiTableColumn('SYMBOL', 'Loss'),  
    new SpiTableColumn('SYMBOL', 'GST'),  
    new SpiTableColumn('SYMBOL', 'Total'),  
    new SpiTableColumn('SYMBOL', 'Quantity'),  
    new SpiTableColumn('SYMBOL', 'Expiry_date'),  
    new SpiTableColumn('SYMBOL', 'Expiry_date'),  
  ];
  tableData = [];
  spiTableSettings: any;
  productDetails: any[];
  constructor(private spiTableService: SpiTableService, public afAuth: AngularFirestore) { }

  ngOnInit() {    
    // this.spiTableService.setComponent(DemoChildComponent, 'spi-table-' + this.test);    
    
    this.getListOfProducts();
    
  }

   getListOfProducts() {
     this.afAuth.collection('Product_List').snapshotChanges().subscribe(data => {
      console.log(data)
      data.map(e => {
          this.tableData.push(e.payload.doc.data());
      })
      this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'product-details', false);
    })

    // this.spiTableSettings =  new SpiTableSettings(this.tableData, this.displayedColumns, 'product-details', true);      
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
    const id = 'product-details';
    this.spiTableService._resizeTable(id);
  }
}
