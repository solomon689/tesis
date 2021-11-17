import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { environment } from '../environments/environment';

import { SMS } from '@ionic-native/sms/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

// if (isDevMode()) {
//   const config: SocketIoConfig = { url: '192.168.1.89:8080', options: {} };
// } else {
//   const config: SocketIoConfig = { url: 'https://sockets-geoen.herokuapp.com', options: {} };
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    ComponentsModule,
    AppRoutingModule,
    IonicModule.forRoot(), 
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(environment.socketConfig),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    SpeechRecognition,
    SMS,
    AndroidPermissions,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
