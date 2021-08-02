import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details.component';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
const routes = [
  { path: '', component: EmployeeDetailsComponent }
]

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    SpiTablesModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeDetailsModule { }
