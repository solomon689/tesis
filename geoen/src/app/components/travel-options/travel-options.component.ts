import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SocketsService } from '../../services/sockets.service';
import { environment } from '../../../environments/environment';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { ToolsService } from '../../services/tools.service';
import { Contact } from '../../models/user';

@Component({
  selector: 'app-travel-options',
  templateUrl: './travel-options.component.html',
  styleUrls: ['./travel-options.component.scss'],
})
export class TravelOptionsComponent implements OnInit {

  @Input() public isStarted: boolean;
  @Input() public roomId: string = '';
  @Input() public minutes: number = null;
  @Input() public contacts: Contact[] = [];
  @Input() public userName: string = '';
  @Input() public timeInterval: number = 60000;
  @Output() public finishEvent = new EventEmitter<boolean>();


  constructor(
              private socketService: SocketsService,
              private sprService: SpeechRecognitionService,
              private toolsService: ToolsService
  ) { }

  ngOnInit() {
  }

  public sendAlert(): void {
    this.toolsService.sendSMS(this.contacts, this.userName);
    this.socketService.emitAlert(environment.typeOfAlert.INSTANT_MESSAGE, null, this.roomId);
    this.toolsService.presentToast('Alerta enviada');
  }

  public sendVoiceAlert(): void {
    this.sprService.requestPermission()
      .then( () => {
        this.sprService.startListening().subscribe( (matches: string[]) => {
          this.socketService.emitAlert(environment.typeOfAlert.VOICE_MESSAGE, matches[0], this.roomId);
          this.toolsService.sendSMS(this.contacts, this.userName);
          this.toolsService.presentToast('Alerta enviada');
        });
      })
      .catch(onError => {
        console.log(onError);
        this.toolsService.presentToast('Algo ha salido mal');
      });
  }

  public finishTravel(): void {
    this.isStarted = false;

    this.finishEvent.emit(this.isStarted);
  }

}
