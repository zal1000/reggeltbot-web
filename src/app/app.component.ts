import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Reggeltbot';
  userProfilePicture = "https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c";

  constructor() {}

  ngOnInit() {
  }

  stonks() {
    let audio = new Audio();
    audio.src = "https://www.myinstants.com/media/sounds/different-variations-for-stonks-sound-effect.mp3";
    audio.load();
    audio.play();
  }
}
