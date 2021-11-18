import { Injectable, Type } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageService: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * 
   * Permite almacenar el ID único del usuario y su estado dentro del sistema.
   * 
   * @param isSignIn - Identifica si el usuario se logeo exitosamente o no
   * @param uid - ID única que le pertenece al usuario
   */
  public async setKeysOnLogin(isSignIn: boolean, uid: string) {
    await this.storageService.set('isSignIn', isSignIn);
    await this.storageService.set('uid', uid);
    console.log('guarde la info :)');
  }

  /**
   * Permite obtener un item almacenado dentro del storage
   * @param key - Nombre que hace referencia a un valor guardado dentro del storage
   * @returns Una promesa de cualquier tipo.
   */
  public getItemFromStorage<Type>(key: string): Promise<Type> {
    return this.storageService.get(key);
  }
  
  /**
   * Remueve todos los datos referentes al login del usuario almacenados dentro del storage
   */
  public async removeLoginInfoFromStorage(): Promise<void> {
    await this.storageService.set('isSignIn', false);
    await this.storageService.remove('uid');
    console.log('Borre info de login');
  }

  /**
   * Crea el storage
   */
  private async init(): Promise<void> {
    const storage = await this.storage.create();
    this.storageService = storage;
  }
}
