import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';

const routes = [
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RootMaterialModule
  ]
})
export class DashboardModule { }
