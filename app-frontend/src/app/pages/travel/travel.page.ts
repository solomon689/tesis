import { Component, isDevMode, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { SocketsService } from 'src/app/services/sockets.service';
import { Share, ShareResult } from '@capacitor/share';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';
import { Contact } from '../../models/user';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {

  public isStarted: boolean = false;
  public roomId: string = '';
  public minutes: number = null;
  public userName: string = '';
  public timeForm: FormGroup;
  public userContacts: Contact[] = [];

  private travelPattern = /^[0-9]+$/;

  constructor(
              public fl: FormBuilder,
              private mapService: MapService,
              private socketService: SocketsService,
              private userService: UserService,
              private storageService: StorageService
  ) {
    // Validators.min(10), Validators.max(60)
    this.timeForm = this.fl.group({
      time: ['', [Validators.required, Validators.pattern(this.travelPattern)]]
    });
   }

  ngOnInit() {
    this.getUsername();
  }

  public startTravel(): void {
    const { time } = this.timeForm.value;

    this.minutes = this.transformToMinute(time);

    this.socketService.generateShareLink(this.userName).subscribe( urlParams => {
      this.roomId = urlParams.roomId;

      this.shareMonitoringLink(urlParams.roomId, urlParams.userName).then(result => {
        this.timeForm.reset();
        this.isStarted = !this.isStarted;
        this.mapService.startingToWatch(this.roomId);
        this.userService.initUserRecords(this.roomId, this.getActualTime());
      });
    });
  }

  public finishTravel(finishTravel: boolean): void {
    this.isStarted = finishTravel;
    /*
      A continuación se reinicia la instancia de map con el metodo getCurrentPosition
      para que la bateria del usuario no se consuma con el metodo watchPosition.
    */
    this.mapService.stopWatchPosition();
    this.mapService.buildMap();

    this.socketService.emitFinishTravel(this.roomId, true);
  }

  private getUsername(): void {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      this.userService.getUserByUid(uid).subscribe(user => {
        this.userName = user.name;
        this.userContacts = user.contacts;
       });
    })
  }

  private async shareMonitoringLink(id: string, userName: string): Promise<ShareResult> {
    
    return await Share.share({
      title: 'GEOEN',
      text: 'Vigila mi trayecto a través del siguiente enlace',
      url: `${environment.shareUrl}/${id}/${userName}`,
      dialogTitle: 'Compartelo con amigos de confianza'
    });

  }

  private transformToMinute(time: number): number {
    const minute: number = 60000;

    return time * minute;
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
