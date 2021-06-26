import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: ProductDetailsComponent }
]

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailsModule { }
