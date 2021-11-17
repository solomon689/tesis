import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorViewRoutingModule } from './monitor-view-routing.module';
import { MonitorViewComponent } from './monitor-view.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MonitorViewComponent
  ],
  imports: [
    CommonModule,
    MonitorViewRoutingModule,
    SharedModule
  ]
})
export class MonitorViewModule { }
