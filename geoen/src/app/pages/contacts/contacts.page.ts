/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ContactModalComponent } from '../../components/contact-modal/contact-modal.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public contacts: Contact[] = [];
  public showContacts: boolean = true;

  constructor(
              private toolsService: ToolsService,
              private storageService: StorageService,
              private contactService: ContactService, 
              private modalController: ModalController 
  ) { }

  ngOnInit() {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      this.getUserContacts(uid);
    });
    
  }

  public async registerContacts(): Promise<void> {
    const modal = await this.modalController.create({
      component: ContactModalComponent,
      animated: true,
    });
    return await modal.present();
  }

  public getUserContacts(uid: string): void{
    this.contactService.getContacts(uid).subscribe( data => {

      if(data.contacts != undefined){

        if (data.contacts.length == 0){
          this.showContacts = false;
        } else {
          this.contacts = data.contacts;
          this.showContacts = true;
        }
        
      } else {
        this.showContacts = false;
      }
    });
  } 

  public removeContact(contact: Contact){
    this.toolsService.presentLoading('Borrando...', 2000);
    setTimeout(() => {
      this.contactService.deleteContact(contact);
    }, 2000);
  }

}
