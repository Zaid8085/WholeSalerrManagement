import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "src/app/routes/dashboard/dashboard.component";
import { RootMaterialModule } from "src/app/shared/modules/root-material.module";
import { BoltSidenavModule } from "../bolt-sidenav/bolt-sidenav.module";
import { HeaderComponent } from "./layout-content/header/header.component";
import { LayoutContentComponent } from "./layout-content/layout-content.component";
import { LayoutComponent } from "./layout.component";

const routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'add-product',
    loadChildren: () => import('../../routes/add-product/add-product.module').then(m => m.AddProductModule)
  }
]
@NgModule({
  declarations: [LayoutComponent, LayoutContentComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    RootMaterialModule,
    BoltSidenavModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    LayoutComponent, LayoutContentComponent, HeaderComponent
  ]
})
export class LayoutModule { }