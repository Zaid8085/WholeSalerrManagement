import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeComponent } from './income.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: IncomeComponent }
]

@NgModule({
  declarations: [
    IncomeComponent
  ],
  imports: [
    CommonModule,
    RootMaterialModule,
    SpiTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class IncomeModule { }
