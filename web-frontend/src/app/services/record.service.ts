import { Injectable } from '@angular/core';
import { Record } from '../shared/models/message';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from '@firebase/app-compat';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private keyRecords: string = 'records'

  constructor(
              private angularFireStore: AngularFirestore
  ) {
  }

  /**
   * Permite añadir un registro nuevo en firebase
   * @param record - Nuevo registro a agregar
   */
  public addRecord(record: Record, id: string): void {
    this.angularFireStore.doc<any>(`records/${id}`).update({
      records: firebase.firestore.FieldValue.arrayUnion(record)
    });
  }

  /**
   * Permite borrar todos los registros guardados en firebase
   */
  public deleteRecords(id: string): void {
    this.angularFireStore.doc<any>(`records/${id}`).delete();
  }

  /**
   * Permite obtener todos los registros guardados desde firebase
   */
  public getRecords(id: string): Observable<any | undefined> {
    return this.angularFireStore.doc<any>(`records/${id}`).valueChanges();
  }

}
