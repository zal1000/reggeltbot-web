import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAnalytics} from '@angular/fire/analytics'
import { AngularFireDatabase } from '@angular/fire/database'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Reggeltbot';
  loggedin: boolean = false;
  userProfilePicture: any = "assets/images/demo-pp-demo.png";
  loginmsg: string = "Logged out";
  showConsole: boolean = environment.showConsole;
  prod: boolean = environment.production;
  checkurl: any;
  botuptime: string = "Loading...";
  constructor(
    public afAuth: AngularFireAuth, 
    private http: HttpClient, 
    private anal: AngularFireAnalytics,
    private rdb : AngularFireDatabase,
    ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedin = true;
        this.loginmsg = `Logged in as: ${user.email}`
        if(!user.photoURL){
          this.userProfilePicture = "assets/images/demo-pp-demo.png";
        } else {
          if(!user.photoURL){
            this.userProfilePicture = "assets/images/demo-pp-demo.png";
          } else {
            this.userProfilePicture = user.photoURL;
          }

        }
      } else {
        this.loginmsg = `Logged out`

        this.loggedin = false
        this.userProfilePicture = "assets/images/demo-pp-demo.png";
      }
    });


  }

  ngOnInit() {
    const ref = this.rdb.database.ref('bots/status');
    /*ref.on('value', snapshot => {
      this.asd(snapshot)
    });*/
  }

  asd(data: any) {
    console.log(data.val())
    this.botuptime = data.val().reggeltbotUpRead
  }

  stonks() {
    let audio = new Audio();
    audio.src = "https://www.myinstants.com/media/sounds/different-variations-for-stonks-sound-effect.mp3";
    audio.load();
    audio.play();
  }
}
