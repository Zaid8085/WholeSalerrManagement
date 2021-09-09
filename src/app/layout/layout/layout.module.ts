import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/routes/dashboard/dashboard.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { BoltSidenavModule } from '../bolt-sidenav/bolt-sidenav.module';
import { HeaderComponent } from '../bolt-sidenav/bolt-sidenav/header/header.component';
import { LayoutContentComponent } from './layout-content/layout-content.component';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../../login/login/login.component';

const routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', loadChildren: () =>
          import('../../routes/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'add-product',
        loadChildren: () =>
          import('../../routes/add-product/add-product.module').then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('../../routes/product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
      },
      {
        path: 'distributor-entry',
        loadChildren: () =>
          import('../../routes/distributor-entry/distributor-entry.module').then(
            (m) => m.DistributorEntryModule
          ),
      },
      {
        path: 'distributor-details',
        loadChildren: () =>
          import('../../routes/distributor-details/distributor-details.module').then(
            (m) => m.DistributorDetailsModule
          ),
      },
      {
        path: 'employee-entry',
        loadChildren: () =>
          import('../../routes/employee-entry/employee-entry.module').then(
            (m) => m.EmployeeEntryModule
          ),
      },
      {
        path: 'income',
        loadChildren: () =>
          import('../../routes/income/income.module').then(
            (m) => m.IncomeModule
          )
      },
      {
        path: 'employee-details',
        loadChildren: () =>
          import('../../routes/employee-details/employee-details.module').then(
            (m) => m.EmployeeDetailsModule
          ),
      },
      {
        path: 'saloon',
        loadChildren: () =>
          import('../../routes/saloon/saloon.module').then(
            (m) => m.SaloonModule
          ),
      },
      {
        path: 'student-registration',
        loadChildren: () =>
          import('../../routes/student-registration/student-registration.module').then(
            (m) => m.StudentRegistrationModule
          ),
      },
      {
        path: 'student-details',
        loadChildren: () =>
          import('../../routes/student-details/student-details.module').then(
            (m) => m.StudentDetailsModule
          ),
      },
      {
        path: 'diet-plan',
        loadChildren: () =>
          import('../../routes/diet-plan/diet-plan.module').then(
            (m) => m.DietPlanModule
          ),
      },
      {
        path: 'diet-plan-settings',
        loadChildren: () =>
          import('../../routes/diet-plan-settings/diet-plan-settings.module').then(
            (m) => m.DietPlanSettingsModule
          ),
      },
    ]
  },
];
@NgModule({
  declarations: [LayoutComponent, LayoutContentComponent],
  imports: [
    CommonModule,
    RootMaterialModule,
    BoltSidenavModule,
    RouterModule.forChild(routes),
  ],

})
export class LayoutModule { }
