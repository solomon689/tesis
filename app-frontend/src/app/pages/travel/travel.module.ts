import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelPageRoutingModule } from './travel-routing.module';

import { TravelPage } from './travel.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TravelPage]
})
export class TravelPageModule {}
