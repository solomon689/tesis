import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    SocketIoModule.forRoot(environment.socketConfig),
    AngularFireModule.initializeApp(environment.firebase),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore()),
    // provideFunctions(() => getFunctions()),
    // provideMessaging(() => getMessaging()),
    // providePerformance(() => getPerformance()),
    // provideRemoteConfig(() => getRemoteConfig()),
    // provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
