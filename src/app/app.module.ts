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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginModule } from './login/login.module';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NotificationComponent } from './shared/components/notification/notification.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { DistributorEntryComponent } from './routes/distributor-entry/distributor-entry.component';
import { SpiTablesModule } from "./shared/components/spi-tables/spi-tables.module";
@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RootMaterialModule,
    BoltSidenavModule,
    LayoutModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    ReactiveFormsModule,
    SpiTablesModule
  ],
  exports: [
    SpiTablesModule,
    NotificationComponent
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
