import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutContentComponent } from './layout/layout/layout-content/layout-content.component';
import { RootMaterialModule } from './shared/modules/root-material.module';
import { BoltSidenavModule } from './layout/bolt-sidenav/bolt-sidenav.module';
import { LayoutModule } from './layout/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RootMaterialModule,
    BoltSidenavModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
