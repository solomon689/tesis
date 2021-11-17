import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PushNotificationService } from 'src/app/services/push-notification.service';
import { RecordService } from 'src/app/services/record.service';
import { SocketsService } from 'src/app/services/sockets.service';
import Swal from 'sweetalert2';
import { Record } from '../../shared/models/message';


enum typeOfRecord {
  ALERT = 'alert',
  ANSWERED = 'answered',
  NOT_ANSWERED = 'not_answered'
}

@Component({
  selector: 'app-monitor-view',
  templateUrl: './monitor-view.component.html',
  styleUrls: ['./monitor-view.component.scss']
})
export class MonitorViewComponent implements OnInit {

  public records: Record[] = []; 
  public muted: string = 'muted';
  public roomId: string = '';

  constructor(
              private socketService: SocketsService,
              private pushNotif: PushNotificationService,
              private route: ActivatedRoute,
              private recordService: RecordService
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params.id;
    this.pushNotif.initNotifications();
    this.recordService.getRecords(this.roomId).subscribe(data => {
      if (data) {
        this.records = data.records;
      }
    })
    this.initSocketEvents();
  }

  public setClassRecord(record: Record): string {
    return (record.typeRecord === typeOfRecord.NOT_ANSWERED || record.typeRecord === typeOfRecord.ALERT)
    ? 'text-danger' : 'text-success';
  }

  /* 
    *Metodo que sirve para inicializar los socket events y queden a la escucha.
  */
  private initSocketEvents(): void {
    this.socketService.connectToRoom(this.roomId);

    this.socketService.finishTravel().subscribe( answer => {
      if (answer) {
        const actualTime = this.getActualTime();
        const deleteRecordsTime: number = 300 * 1000; // despues de 5 minutos se borrará el mensaje que le indica al usuario que finalizo el trayecto.

        this.recordService.deleteRecords(this.roomId);
        this.records = [];
        this.records.push( { hour: actualTime, message: 'El usuario ha finalizado de compartir su trayecto.' } );

        this.activateAudio();

        setTimeout(() => {
          this.records = [];
        }, deleteRecordsTime);

        Swal.fire({
          title: 'Fin del monitoreo',
          text: `El usuario ha finalizado de compartir su ubicación`,
          icon: 'info',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'   
        });
      }
    });

    this.socketService.receiveAlert().subscribe( alert => {
      this.recordService.addRecord({ hour: alert.hour, message: alert.record, typeRecord: alert.typeRecord }, this.roomId);
      this.pushNotif.showAlertNotification();
      this.activateAudio();

      Swal.fire({
        title: alert.title,
        text: alert.message,
        icon: 'error',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'   
      });

    });

    this.socketService.receiveRecord().subscribe( record => {
      if (record) {
        this.recordService.addRecord(record, this.roomId);
        this.activateAudio();
      }
    });
  }

  private getActualTime(): string {
    let hours: string = new Date().getHours().toString();
    let minutes: string = '';
    let newTime: string = '';

    if (new Date().getMinutes() < 10) {
      minutes = minutes.concat('0', new Date().getMinutes().toString());
    } else 
      minutes = new Date().getMinutes().toString();

    return newTime.concat(hours,':',minutes);
  }

  private activateAudio(): void {
    const audio: HTMLAudioElement = <HTMLAudioElement> document.getElementById('alert-audio');
    this.muted = '';
    audio.play();
  }

}
