import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';

const routes = [
  { path: '', component: ProductDetailsComponent }
]

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
  CommonModule,
    RootMaterialModule,
    SpiTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailsModule { }
