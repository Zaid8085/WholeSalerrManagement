import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
import { DietPlanComponent } from './diet-plan.component';

const routes = [
  { path: '', component: DietPlanComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootMaterialModule,
    SpiTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class DietPlanModule { }
