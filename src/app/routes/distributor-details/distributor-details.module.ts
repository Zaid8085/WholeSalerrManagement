import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorDetailsComponent } from './distributor-details.component';
import { RouterModule } from '@angular/router';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
const routes = [
  { path: '', component: DistributorDetailsComponent }
]

@NgModule({
  declarations: [DistributorDetailsComponent],
  imports: [
    CommonModule,
    SpiTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class DistributorDetailsModule { }
