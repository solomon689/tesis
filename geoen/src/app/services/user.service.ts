/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { ToolsService } from './tools.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(
              private firebase: AngularFirestore,
              private toolsService: ToolsService,
  ) {
    this.usersCollection = this.firebase.collection<User>('users');
    this.getUsersFromDB();
  }

  /**
   * Método que permite guardar a un usuario como documento dentro de la base de datos
   * de firebase
   * @param user - Objeto que contiene la información del usuario 
   * @returns Promesa de tipo vacío que permite verificar si el procedimiento fallo o no
   */
  public saveUserOnDB(user: User): Promise<void> {
    return new Promise(async (resolve,reject) => {
      try {
        const result = await this.usersCollection.doc(user.id).set({
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
          phone: user.phone,
          isActive: true,
          contacts: []
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Método que permite obtener un usuario a través de su uid
   * @param uid - uid del usuario que se encuentra logeado
   * @returns Observable de tipo User que contiene la información del usuario solicitado
   */
  public getUserByUid(uid: string): Observable<User> {
    return this.firebase.doc<User>(`users/${uid}`).valueChanges();
  }
  
  /**
   * Método que permite actualizar la información del usuario dentro de la base de datos
   * @param newData - Objecto que contiene la información nueva del usuario
   * @param uid - uid del usuario que se encuentra logeado actualmente dentro de la aplicación
   */
  public updateUserData(newData: User, uid: string) {
    this.firebase.doc<User>(`users/${uid}`).update({
      name: newData.name,
      lastname: newData.lastname,
      phone: newData.phone,
      email: newData.email
    })
    .then(() => this.toolsService.presentToast('Se han actualizado los datos con exito.'))
    .catch(() => this.toolsService.presentToast('No se han podido actualizar los datos.'));
  }

  public async initUserRecords(id: string, actualTime: string): Promise<void> {
    const records = [{
      hour: actualTime,
      message: 'El usuario ha iniciado el recorrido',
      typeRecord: 'answered'
    }];

    await this.firebase.doc<any>(`records/${id}`).set({records});
  }

  /**
   * Método que permite obtener la coleccion de todos los documentos dentro de la 
   * base de datos de usuarios
   */
  private getUsersFromDB() {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(controls => controls.map(document => document.payload.doc.data() as User))
    );
  }

}
