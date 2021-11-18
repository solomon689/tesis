import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    NavHeaderComponent,
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavHeaderComponent,
    MapComponent
  ]
})
export class SharedModule { }
