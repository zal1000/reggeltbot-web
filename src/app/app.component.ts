import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Reggeltbot';
  loggedin: boolean = false;
  userProfilePicture: any = "https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c";
  loginmsg: string = "Logged out";

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedin = true;
        this.loginmsg = `Logged in as: ${user.email}`
        if(!user.photoURL){
          this.userProfilePicture = "https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c";
        } else {
          this.userProfilePicture = user.photoURL;
        }
      } else {
        this.loginmsg = `Logged out`

        this.loggedin = false
        this.userProfilePicture = "https://firebasestorage.googleapis.com/v0/b/zal1000.net/o/demo%2Fpp%2Fdemo.png?alt=media&token=93fec366-cc41-45e0-9ad1-f6a399cc750c";
      }
    })
  }

  ngOnInit() {

  }

  stonks() {
    let audio = new Audio();
    audio.src = "https://www.myinstants.com/media/sounds/different-variations-for-stonks-sound-effect.mp3";
    audio.load();
    audio.play();
  }
}
