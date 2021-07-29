import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RootMaterialModule } from '../shared/modules/root-material.module';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    LayoutModule
  ]
})
export class LoginModule { }
