import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpiTableComponent } from './spi-table/spi-table.component';
import { SpiBodyComponent } from './spi-table/spi-body/spi-body.component';
import { SpiHeaderComponent } from './spi-table/spi-header/spi-header.component';
import { SpiRowComponent } from './spi-table/spi-body/spi-row/spi-row.component';
import { SpiCellComponent } from './spi-table/spi-cell/spi-cell.component';
import { SpiPagintionComponent } from './spi-table/spi-pagintion/spi-pagintion.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpiSpinnerComponent } from './spi-spinner/spi-spinner.component';
import { SpiShowMoreColumnsComponent } from './spi-show-more-columns/spi-show-more-columns.component';
import { RootMaterialModule } from '../../modules/root-material.module';


@NgModule({
  declarations: [SpiTableComponent,
    SpiBodyComponent,
    SpiHeaderComponent,
    SpiRowComponent,
    SpiCellComponent,
    SpiPagintionComponent,
    SpiSpinnerComponent,
    SpiShowMoreColumnsComponent
  ],
  imports: [
    CommonModule,
    RootMaterialModule,
    FlexLayoutModule,
  ],
  exports: [SpiTableComponent, SpiHeaderComponent, SpiBodyComponent, SpiRowComponent, SpiShowMoreColumnsComponent, SpiSpinnerComponent],
  entryComponents: [SpiShowMoreColumnsComponent]
})
export class SpiTablesModule { }
