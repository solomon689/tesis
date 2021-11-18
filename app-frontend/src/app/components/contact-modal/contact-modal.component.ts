import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/models/user';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
})
export class ContactModalComponent implements OnInit {

  public registerContactForm: FormGroup;
  private phonePattern: string = '[0-9]{9}';
  private namePattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

  constructor(
              private modalController: ModalController,
              private fb: FormBuilder,
              private contacts: ContactService,
              private toolsService: ToolsService          
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public dismissModal(): void {
    this.modalController.dismiss();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public contactRegister(): void{
    const contact: Contact = this.cleanValuesFromInput();

    this.modalController.dismiss();
    this.toolsService.presentLoading('Agregando...', 2000);
    
    setTimeout(() => {
      this.contacts.updateContacsUser(contact);
    }, 2000);
  }

  private initForm(): void {
    this.registerContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    });
  }

  private cleanValuesFromInput(): Contact {
    const newContact: Contact = this.registerContactForm.value;

    newContact.name = newContact.name.trim();
    newContact.name = newContact.name.toLowerCase();
    
    return newContact;
  }
  
}
