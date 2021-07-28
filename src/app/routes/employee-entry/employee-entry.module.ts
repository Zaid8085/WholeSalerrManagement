import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { EmployeeEntryComponent } from './employee-entry.component';
import { RouterModule } from '@angular/router';
const routes = [
  { path: '', component: EmployeeEntryComponent }
]

@NgModule({
  declarations: [EmployeeEntryComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeEntryModule { }
