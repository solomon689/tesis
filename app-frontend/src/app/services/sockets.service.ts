import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserLocation } from '../models/user-location';


@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(
              private socket: Socket
  ) { }

  /**
   *  Retorna un observable en función del evento recibido a través de la API sockets
   * @param userName - Nombre del usuario GEOEN
   * @returns Observable que contiene la id de la sala de sockets
   */
  public generateShareLink(userName: string): Observable<any> {
    this.socket.emit('create-room', userName);
    return this.socket.fromEvent('room-id');
  }

  /**
   * Método encargado de enviar las coordenadas del usuario hacia la página de
   * monitoreo.
   * @param userPosition - Parámetro que contiene la latitud y longitud del usuario
   * @param roomId - Parámetro que contiene la id de la sala de la api socket
   */
  public emitUserCoords(userPosition: UserLocation, roomId: string): void {
    this.socket.emit('started', {
      roomId,
      userPosition
    });
  }

  /**
   * Método encargado de enviar un registro sobre el estado del usuario hacia la página
   * de monitoreo.
   * @param record - Mensaje que se envia hacia la página de monitoreo 
   * @param roomId - Parámetro que contiene la id de la sala de la api socket
   * @param typeOfRecord - Parámetro que contiene el tipo de registro (respondido o no respondido)
   */
  public emitRecord(record: string, roomId: string, typeOfRecord: string): void {
    this.socket.emit('record', {
      roomId,
      record,
      typeOfRecord
    });
  }

  /**
   * Método encargado de enviar una alerta de emergencia hacia la página de monitoreo
   * 
   * @param typeOfAlert - Parámetro que contiene el tipo de alerta (instantanea o por mensaje de voz)
   * @param message - Mensaje que contiene la alerta
   * @param roomId - Parámetro que contiene la id de la sala de la api socket
   */
  public emitAlert(typeOfAlert: string, message: string = null, roomId: string, hour?: string): void {

    if (!message) {
      const payload = {
        typeOfAlert,
        roomId,
        hour: this.getActualTime()
      }
      this.socket.emit('alert', payload);
    } else {
      const payload = {
        typeOfAlert,
        message,
        roomId,
        hour: this.getActualTime()
      }
      this.socket.emit('alert', payload);
    }

  }

  /**
   * Método encargado de enviar un booleano hacia la página de monitoreo 
   * para dar aviso que el usuario ha terminado de compartir su trayecto. 
   * @param roomId - Parámetro que contiene la id de la sala de la api socket
   * @param answer - Párametro que contiene un booleano para indicar si el trayecto finalizó
   */
  public emitFinishTravel(roomId: string, answer: boolean): void {
    this.socket.emit('finish-travel', {
      roomId,
      answer
    });
  }

  private getActualTime(): string {
    let minutes: string = '';
    let actualTime: string = '';
    const hour: string = new Date().getHours().toString();

    if (new Date().getMinutes() < 10) 
        minutes = minutes.concat('0', new Date().getMinutes().toString());
    else 
        minutes = new Date().getMinutes().toString()

    return actualTime = actualTime.concat(hour,':',minutes);
  }

}
