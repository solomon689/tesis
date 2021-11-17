import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketsService } from '../../services/sockets.service';
import { LocalNotifications } from '@capacitor/local-notifications';

enum typeOfRecord {
  ANSWERED = 'answered',
  NOT_ANSWERED = 'not_answered',
}

enum typeOfAlert {
  INSTANT_MSG = 'INSTANT_MSG',
  VOICE_MSG = 'VOICE_MSG',
}

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent implements OnInit, OnDestroy {

  @Input() public minutes: number = 0;
  @Input() public roomId: string = '';

  public remainingTime: string;
  private modal :HTMLElement;
  private modalInterval: any;
  private statusInterval: any;
  private flag: string = typeOfRecord.NOT_ANSWERED;
  

  constructor(
              private socket: SocketsService
  ) { }

  ngOnInit() {
    this.modal = document.querySelector<HTMLElement>('#status-modal');
    this.setStatusInterval(this.minutes);
  }

  ngOnDestroy() {
    clearInterval(this.statusInterval);
    clearInterval(this.modalInterval);
  }

  public setStatusInterval(minutes: number): void {
    if (minutes > 0) {
      this.statusInterval = setInterval(() => {
        this.openModal();
        /* 
          A continuación se detiene el intervalo para que no se active denuevo
          mientras el usuario no haya respondido sobre su estado.
        */
        clearInterval(this.statusInterval);
      }, minutes);
    } else {
      return;
    }
  }

  public async openModal(): Promise<void> {
    let minutes: number = 300; // equivalente a 5 minutos.
    this.modal.style.display = 'block';

    this.showModalNotification();

    this.modalInterval = setInterval(() => {
      //Se transforma los minutos al formato HH:MM:SS
      this.remainingTime = new Date(minutes* 1000).toISOString().substr(11,8); 
      minutes--;

      if (this.flag === typeOfRecord.ANSWERED) {
        this.modal.style.display = 'none';
        minutes = 300; // equivalente a 5 minutos.
        this.flag = typeOfRecord.NOT_ANSWERED;
        this.setStatusInterval(this.minutes);
        clearInterval(this.modalInterval);
      }

      /* 
        Si el tiempo llega a 0, el sistema enviará una alerta con el
        mensaje de que el usuario no ha respondido en el tiempo acordado.
      */
      if (minutes < 0) {
        this.modal.style.display = 'none';
        minutes = 300; // equivalente a 5 minutos.
        this.socket.emitAlert(
          typeOfAlert.VOICE_MSG,
          'El usuario no ha respondido sobre su estado pasado 5 minutos.',
          this.roomId
        );
        this.setStatusInterval(this.minutes);
        clearInterval(this.modalInterval);
      }
    }, 1000);
  }

  public userStatus(answer: boolean): void {
    if (answer) {
      this.socket.emitRecord(
        'El usuario ha respondido que se encuentra bien', 
        this.roomId,
        typeOfRecord.ANSWERED
      );
      this.flag = typeOfRecord.ANSWERED;
    } else {
      this.socket.emitRecord(
        'El usuario ha respondido que no se encuentra bien.',
        this.roomId,
        typeOfRecord.NOT_ANSWERED
      );
      this.flag = typeOfRecord.ANSWERED;;
    }
  }

  private async showModalNotification(): Promise<void> {
    await LocalNotifications.schedule({ notifications: [
      {
        title: '¿Te encuentras bien?',
        body: '',
        largeBody: 'Responde a tus amigos para que sepan sobre tu estado actual',
        id: 1,
        autoCancel: true
      }
    ]});
  }

}
