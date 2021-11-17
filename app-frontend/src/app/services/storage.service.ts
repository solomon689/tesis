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

  public async setKeysOnLogin(isSignIn: boolean, uid: string) {
    await this.storageService.set('isSignIn', isSignIn);
    await this.storageService.set('uid', uid);
    console.log('guarde la info :)');
  }

  // public async setItemInStorage<Type>(key: string, value: Type): Promise<Type> {
  //   return await this.storageService.set(key, value);
  // }

  public getItemFromStorage<Type>(key: string): Promise<Type> {
    return this.storageService.get(key);
  }
  
  public async removeLoginInfoFromStorage(): Promise<void> {
    await this.storageService.set('isSignIn', false);
    await this.storageService.remove('uid');
    console.log('Borre info de login');
  }

  private async init(): Promise<void> {
    const storage = await this.storage.create();
    this.storageService = storage;
  }
}
