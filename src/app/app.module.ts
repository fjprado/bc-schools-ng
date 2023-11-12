import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './layout/components/dropdown/dropdown.component';
import { SchoolDashboardComponent } from './pages/school-dashboard/school-dashboard.component';
import { TableFilterComponent } from './layout/components/table-filter/table-filter.component';
import { TableContentComponent } from './layout/components/table-content/table-content.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SchoolMapComponent } from './layout/components/school-map/school-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    DropdownComponent,
    SchoolDashboardComponent,
    TableContentComponent,
    TableFilterComponent,
    SchoolMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
