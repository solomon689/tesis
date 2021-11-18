import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() {
  }

  /**
   * Permite que el contacto pueda suscribirse a la notificaciones
   * y en caso de recibir una alerta le llegará una notificación
   */
  public initNotifications(): void {
    this.onLoad().then((oneSignal) => {
      oneSignal.init({
        appId: '8c55d484-271a-4eed-ae62-cf1fb7cdfa43',
        welcomeNotification: {
          "title": "Gracias por suscribirte",
          "message": 'Ahora podrás recibir notificaciones si tu amigo sufre de alguna emergencia.'
        }
      });
      oneSignal.showSlidedownPrompt();
    });
  }

  /**
   * Muestra la notificación una vez recibida la alerta por parte del usuario geoen
   */
  public showAlertNotification(roomId: string, userName: string): void {
    this.onLoad().then((oneSignal) => {
      oneSignal.sendSelfNotification(
        "!!!Alerta!!!",
        "Tu amigo/a ha enviado un mensaje de alerta.",
        `https://monitoreo.vercel.app/monitoring/${ roomId }/${ userName }`,
        "https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg"
      );
    });
  }

  /**
   * Permite carga la API oneSignal para el envio de notificaciones
   */
  private async onLoad(): Promise<any> {
    (window as any).OneSignal = (window as any).OneSignal || [];
    
    return new Promise(resolve => {
      (window as any).OneSignal.push(() => {
        resolve((window as any).OneSignal);
      });
    });
  }
}
