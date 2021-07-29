import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details.component';
import { RouterModule } from '@angular/router';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
const routes = [
  { path: '', component: EmployeeDetailsComponent }
]

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    SpiTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeDetailsModule { }
