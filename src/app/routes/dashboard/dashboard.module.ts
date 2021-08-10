import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { MatCardModule } from "@angular/material/card";
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from "@angular/router";
const routes = [
  { path: '', component: DashboardComponent }
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RootMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
