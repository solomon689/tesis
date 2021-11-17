import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TravelOptionsComponent } from './travel-options/travel-options.component';
import { MapComponent } from './map/map.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { StatusModalComponent } from './status-modal/status-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TravelOptionsComponent,
    MapComponent,
    ContactModalComponent,
    MenuContentComponent,
    StatusModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    TravelOptionsComponent,
    MapComponent,
    ContactModalComponent,
    MenuContentComponent,
    StatusModalComponent
  ]
})
export class ComponentsModule { }
