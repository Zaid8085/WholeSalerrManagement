import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RootMaterialModule } from "src/app/shared/modules/root-material.module";
import { BoltSidenavModule } from "../bolt-sidenav/bolt-sidenav.module";
import { HeaderComponent } from "./layout-content/header/header.component";
import { LayoutContentComponent } from "./layout-content/layout-content.component";
import { LayoutComponent } from "./layout.component";

@NgModule({
    declarations: [LayoutComponent, LayoutContentComponent, HeaderComponent],
    imports: [
      CommonModule,
      RouterModule,
      RootMaterialModule,
      BoltSidenavModule,
    ],
    exports: [
      LayoutComponent, LayoutContentComponent, HeaderComponent
    ]
  })
  export class LayoutModule { }