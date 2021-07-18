import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
const routes = [
  { path: '', component: AddProductComponent }
]

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class AddProductModule { }
