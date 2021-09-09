import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { RouterModule } from '@angular/router';
import { SpiTablesModule } from 'src/app/shared/components/spi-tables/spi-tables.module';
import { DietPlanSettingsComponent } from './diet-plan-settings.component';

const routes = [
  { path: '', component: DietPlanSettingsComponent}
]


@NgModule({
  declarations: [DietPlanSettingsComponent],
  imports: [
    CommonModule,
    SpiTablesModule,
    RootMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DietPlanSettingsModule { }
