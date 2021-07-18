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
  { path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    {
      path: 'add-product',
      loadChildren: () =>
        import('../../routes/add-product/add-product.module').then(
          (m) => m.AddProductModule
        ),
    },
   ] 
  },
  {
    path: 'distributor-entry',
    loadChildren: () =>
      import('../../routes/distributor-entry/distributor-entry.module').then(
        (m) => m.DistributorEntryModule
      ),
  },
];
@NgModule({
  declarations: [LayoutComponent, LayoutContentComponent],
  imports: [
    CommonModule,
    RouterModule,
    RootMaterialModule,
    BoltSidenavModule,
    RouterModule.forChild(routes),
  ],
  exports: [LayoutComponent, LayoutContentComponent],
})
export class LayoutModule {}
