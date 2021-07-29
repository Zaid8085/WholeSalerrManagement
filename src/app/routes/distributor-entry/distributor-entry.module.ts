import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistributorEntryComponent } from './distributor-entry.component';
import { RouterModule } from '@angular/router';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
const routes = [
  { path: '', component: DistributorEntryComponent }
]

@NgModule({
  declarations: [DistributorEntryComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ]
})
export class DistributorEntryModule { }
