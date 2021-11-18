import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';
import { ToolsService } from './tools.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { StorageService } from './storage.service';
import { GoogleAuth } from '@reslear/capacitor-google-auth';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private getUserByUidSub: Subscription;

  constructor(
              private angularFireAuth: AngularFireAuth,
              private userService: UserService,
              private router: Router,
              private toolsService: ToolsService,
              private firebase: AngularFirestore,
              private storageService: StorageService
  ) { }

  /**
   * Permite registrar al usuario dentro de la base de datos
   * @param user - Objeto que contiene la información del usuario.
   */
  public signUp(user: User): void {
    const { email, password } = user;
    
    this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then(async res => {
        user.id = res.user.uid; // Se guarda el user id dentro del documento en firebase.

        // Se guarda la información del usuario como documento dentro de firebase
        this.userService.saveUserOnDB(user) 
          .then(() => {
            this.toolsService.presentToast('Se ha creado la cuenta exitosamente.');
            this.signIn(email, password);
          })
          .catch(() => {
            console.log('error');
          });
      })
      .catch(error => {
        this.toolsService.presentToast('Ha ocurrido un error.');
      })
  }

  /**
   * Permite iniciar sesión al usuario mediante su correo electrónico y contraseña
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   */
  public signIn(email: string, password: string): void {

    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then( async ({ user }) => {
          await this.storageService.setKeysOnLogin(true, user.uid);

          this.getUserByUidSub = this.userService.getUserByUid(user.uid).subscribe( user => {
            if (user.isActive) {
              this.toolsService.presentToast('Se ha iniciado sesión correctamente.');
              this.router.navigate(['/geoen/start']);
              this.getUserByUidSub.unsubscribe();
            } else {
              this.toolsService.presentToast('Su cuenta se encuentra desactivada');
              this.getUserByUidSub.unsubscribe();
            }
        });
      })
      .catch(error => {
        this.toolsService.presentToast('correo y/o contraseña incorrectos.');
        this.getUserByUidSub.unsubscribe();
      });
  }

  public async googleAuth(): Promise<any> {
    let googleUser = await GoogleAuth.signIn()
    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);

    this.angularFireAuth.signInAndRetrieveDataWithCredential(credential).then( async ({ user }) => {
      await this.storageService.setKeysOnLogin(true,user.uid);

      this.getUserByUidSub = this.userService.getUserByUid(user.uid).subscribe(data => {
        if (data === undefined) {
          const separateNames: string[] = user.displayName.split(' ');
          const newUser: User = {
            name: separateNames[0],
            lastname: separateNames[1],
            email: user.email,
            phone: user.phoneNumber,
            isActive: true,
            contacts: [],
            id: user.uid
          };
          this.userService.saveUserOnDB(newUser)
            .then(() => {
              this.toolsService.presentToast('Se ha creado la cuenta exitosamente.');
              this.router.navigate(['/geoen/start']);
              this.getUserByUidSub.unsubscribe();
            })
            .catch(error => {
              this.toolsService.presentToast('Ha ocurrido un error');
              this.getUserByUidSub.unsubscribe();
            });
          
        } else {

          if (data.isActive) {
            this.toolsService.presentToast('Se ha iniciado sesión correctamente.');
            this.router.navigate(['/geoen/start']);
            this.getUserByUidSub.unsubscribe();
          } else {
            this.toolsService.presentToast('Su cuenta se encuentra desactivada');
            this.getUserByUidSub.unsubscribe();
          }
    
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  /**
   * Permite al usuario cerrar su sesión actual dentro del sistema
   */
  public signOut(): void {
    this.angularFireAuth.signOut()
    .then(() => {
      this.storageService.removeLoginInfoFromStorage();
      this.toolsService.presentToast('Se ha cerrado sesión');
      this.router.navigate(['/login']);
    });
  }

  /**
   * Desactiva la cuenta del usuario dentro de la base de datos
   * @param active - Parámetro que contiene un booleano con el estatus de la cuenta
   * @param uid - uid del usuario que se encuentra logeado
   */
  public disableUserAccount(active: boolean, uid: string): void {
    this.firebase.doc<User>(`users/${uid}`).update({
      isActive: false
    })
    .then( async () => {
      this.signOut();
      this.toolsService.presentToast('Su cuenta se ha desactivado con exito');      
    })
    .catch(() => {
      this.toolsService.presentToast('Ha ocurrido un error, intentelo nuevamente.');
    });
  }

  /**
   * Permite al usuario cambiar su contraseña si este no la recuerda
   * @param email - Correo electrónico con cual se registro el usuario
   * @returns Una promesa vacia con un estado si fue exitoso el proceso o no
   */
  public async resetPassword(email: string): Promise<void>{
    try{
      return this.angularFireAuth.sendPasswordResetEmail(email);
    }catch(error){
      console.log(error);
    }
  }

  public currentSession(): Promise<boolean> {
    return this.storageService.getItemFromStorage<boolean>('isSignIn');
  }

}
