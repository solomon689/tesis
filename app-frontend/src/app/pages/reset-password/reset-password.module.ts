import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RegisterPageRoutingModule } from '../register/register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
      CommonModule,
      FormsModule,
      IonicModule,
      RegisterPageRoutingModule,
      ReactiveFormsModule,
      ComponentsModule
    ],
    declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
