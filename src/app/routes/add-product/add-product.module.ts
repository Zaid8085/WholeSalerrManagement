import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: AddProductComponent }
]

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AddProductModule { }
