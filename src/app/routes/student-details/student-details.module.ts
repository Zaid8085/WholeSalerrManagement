import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './student-details.component';
const routes = [
  { path: '', component: StudentDetailsComponent}
]

@NgModule({
  declarations: [StudentDetailsComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentDetailsModule { }
