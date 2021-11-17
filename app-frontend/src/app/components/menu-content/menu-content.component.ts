import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from '../../models/user-info';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-menu-content',
  templateUrl: './menu-content.component.html',
  styleUrls: ['./menu-content.component.scss'],
})
export class MenuContentComponent implements OnInit {

  public menuId: string = 'geoen-menu';
  public userInfo: UserInfo;

  constructor(
              private authService: AuthService, 
              private toolsService: ToolsService,
              private storageService: StorageService
  ) { }

  ngOnInit() {
  }

  public logOut(): void {
    this.authService.signOut();
  }

  public disableAccount(): void {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      this.toolsService.presentLoading('Desactivando...');
      setTimeout(() => {
        this.authService.disableUserAccount(false, uid);
      }, 2000);
    });
  }

}
