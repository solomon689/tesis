/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Contact, User } from '../models/user';
import firebase from '@firebase/app-compat';
import { ToolsService } from './tools.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(
              private firebase: AngularFirestore,
              private toolsService: ToolsService,
              private storageService: StorageService      
  ) { }

  /**
   * Permite agregar un nuevo contacto dentro de los contactos del usuario
   * @param contact - Objecto de tipo Contact con la información del contacto 
   */
  public updateContacsUser(contact: Contact): void {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      const user = this.firebase.doc(`users/${uid}`);

      user.update({contacts: firebase.firestore.FieldValue.arrayUnion(contact)})
      .then(result => this.toolsService.presentToast('Contacto agregado exitosamente.'))
      .catch(error => this.toolsService.presentToast('No se ha podido agregar el contacto.'));
    });
  }

  /**
   * Retorna todos los contactos que tiene el usuario
   * @param uid - uid del usuario que se encuentra logeado actualmente 
   * @returns Observable tipo array con todos los contactos del usuario 
   */
  public getContacts(uid: string): Observable<User> {
    return this.firebase.doc<User>(`users/${uid}`).valueChanges();
  }

  /**
   * Permite borrar un contacto dentro de los contactos del usuario
   * @param contact - Objeto que contiene la información del contacto a eliminar
   */
  public deleteContact(contact: Contact): void {
    this.storageService.getItemFromStorage<string>('uid').then(uid => {
      const user = this.firebase.doc(`users/${uid}`);

      user.update({contacts: firebase.firestore.FieldValue.arrayRemove(contact)})
      .then(() => this.toolsService.presentToast('Contacto borrado exitosamente.'))
      .catch(() => this.toolsService.presentToast('No se ha podido borrar el contacto.'));
    });
  }
}

