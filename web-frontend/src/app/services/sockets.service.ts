import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Message, Record } from '../shared/models/message';
import { UserPosition } from '../shared/models/user-position';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(
              private socket: Socket,
  ) { }
  
  /**
   * Permite conectarse a la sala de sockets que permite la comunicación usuario-contacto
   * @param roomId - Id de la sala de sockets
   */
  public connectToRoom(roomId: string): void {
    this.socket.emit('connect-room', {roomId});
  }

  /**
   * Recibe las coordenadas actuales sobre la ubicación del usuario
   * @returns Observable con las coordenadas del usuario
   */
  public receiveUserPosition(): Observable<UserPosition> {
    return this.socket.fromEvent('user-position');
  }

  /**
   * Recibe una alerta de emergencia por parte del usuario geoen.
   * @returns Observable que contiene la información de la alerta recibida
   */
  public receiveAlert(): Observable<Message> {
    return this.socket.fromEvent('send-alert');
  }

  /**
   * Recibe un registro por parte del usuario geoen
   * @returns Observable que contiene la información del registro recibido
   */
  public receiveRecord(): Observable<Record | null> {
    return this.socket.fromEvent<Message>('send-record').pipe(
      map( message => {

        if (message) {
          console.log('entre?');
          const newRecord: Record = { // Se transforma el objeto mensaje a objeto record.
            hour: message.hour,
            message: message.record,
            typeRecord: message.typeRecord
          }
          return newRecord;
        } else {
          return null;
        }

      })
    )
  }

  /**
   * Recibe la respuesta de que el usuario geoen finalizo el trayecto
   * @returns Observable con la respuesta de finalización del trayecto
   */
  public finishTravel(): Observable<boolean> {
    return this.socket.fromEvent<boolean>('send-finish');
  }

}
