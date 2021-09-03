import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { StudentRegistrationComponent } from './student-registration.component';
const routes = [
  { path: '', component: StudentRegistrationComponent}
]


@NgModule({
  declarations: [StudentRegistrationComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentRegistrationModule { }
