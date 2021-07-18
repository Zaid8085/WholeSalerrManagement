import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoltSidenavComponent } from './bolt-sidenav/bolt-sidenav.component';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './bolt-sidenav/menu-item/menu-item.component';
import { RootMaterialModule } from 'src/app/shared/modules/root-material.module';
import { HeaderComponent } from './bolt-sidenav/header/header.component';

@NgModule({
  declarations: [BoltSidenavComponent, MenuItemComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, RootMaterialModule],
  exports: [BoltSidenavComponent, MenuItemComponent, HeaderComponent, RootMaterialModule],
})
export class BoltSidenavModule {}
