import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissionResponse, AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contact } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
              private sms: SMS,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private androidPermissions: AndroidPermissions
  ) { }

  /**
   * Presenta un mensaje de tipo toast en la pantalla del usuario
   * @param message - Mensaje que se le muestra al usuario
   * @param duration - Duración total para mostrar el toast
   * @returns Promesa de tipo void
   */
  public async presentToast(message: string, duration: number = 2000): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      translucent: true
    });
    return await toast.present();
  }

  /**
   * Presenta un modal que contiene una animación de carga junto a un mensaje.
   * @param message - Mensaje a mostrar junto a la animación de carga
   * @param duration - Duración total para mostrar el modal de carga
   */
  public async presentLoading(message: string, duration: number = 2000): Promise<void> {
    const loading = await this.loadingController.create({
      message,
      duration
    });

    return await loading.present();
  }

  public async sendSMS(contacts: Contact[], userName: string): Promise<void> {
    await this.checkPermissions();

    for (const contact of contacts) {
      this.sms.send(contact.phone,`¡Ayuda! me encuentro en peligro`);
    }
  }

  private async checkPermissions(): Promise<void> {
    const havePermissions: AndroidPermissionResponse = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS);

    if (!havePermissions.hasPermission) {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS, this.androidPermissions.PERMISSION.SEND_SMS]);
    } 
  }
}
