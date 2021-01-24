import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage: any = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {}

  requestPermission() {}

  receiveMessage() {}

}
