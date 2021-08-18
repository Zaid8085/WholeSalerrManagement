import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaloonComponent } from './saloon.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
import { RouterModule } from '@angular/router';
const routes = [
  { path: '', component: SaloonComponent }
]

@NgModule({
  declarations: [SaloonComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    SpiTablesModule,
    RouterModule.forChild(routes),
  ]
})
export class SaloonModule { }
