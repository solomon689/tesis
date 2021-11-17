import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  constructor(private speechRecognition: SpeechRecognition) { }

  public recognitionAvailable(): Promise<boolean> {
    return this.speechRecognition.isRecognitionAvailable();
  }

  public requestPermission(): Promise <void> {
    return this.speechRecognition.requestPermission();
  }

  public startListening(): Observable<string[]> {
    let options = {
      language: 'es-CL'
    }
    return this.speechRecognition.startListening(options);
  }

}
