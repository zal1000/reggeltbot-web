import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { MatSlider } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.scss']
})
export class BotSettingsComponent implements OnInit {

  cd: number = 0;
  name: string = "Loading...";
  loading = true;
  err = false;
  cdSet: any;
  changed: boolean = false;
  uid: string | undefined;
  authToken: string | undefined;
  lang: any;
  reggeltlang: any;
  saylang: any;
  constructor(private router: ActivatedRoute, private db: AngularFirestore, public http: HttpClient, public snackbar: MatSnackBar, private auth: AngularFireAuth) {
    this.auth.authState.subscribe(async user => {
        this.uid = user?.uid;
        const doc: any = await this.db.doc(`users/${this.uid}`).get().toPromise();
        this.authToken = doc.data().token;
    });
  }

  async ngOnInit() {
    this.localupdate()

  }

  changedset() {
    this.cdSet = this.cd
    this.changed = true;
  }

  updateSetting(e: MatSlider) {
    this.cdSet = e.value
    this.changed = true;
  }

  async update() {
    console.log(this.cdSet)
    this.changed = false;
    this.sendUpdate().subscribe(
      async (response) => {
        this.snackbar.open('Server configuration updated', '', {
          duration: 5000,
        });
        const doc: any = await this.db.doc(`users/${this.uid}`).get().toPromise();
        this.authToken = doc.data().token;
        this.localupdate();
      },
      (e) => {
        this.snackbar.open(`Error updateing server! ${e.message}`, 'Dismiss')
        console.error(e.message)
        this.localupdate();

      }
    )
  }

  async localupdate() {
    const guildid = this.router.snapshot.paramMap.get('GuildId');
    
    const ref = this.db.doc(`bots/reggeltbot/config/${guildid}`)
    const doc = await ref.get().toPromise()
    const docdata: any = doc.data();

    const doc2: any = await this.db.doc(`users/${this.uid}`).get().toPromise();
    this.authToken = doc2.data().token;

    this.cd = docdata.cd
    this.name = docdata.name
  }

  sendUpdate(): Observable<any> {
    this.loading = true;

    if(this.lang === "1") {
      this.lang = "hu-HU"
    }
    if(this.lang === "2") {
      this.lang = "en-US"
    }
    if(this.lang === "3") {
      this.lang = "de-DE"
    }

    if(this.reggeltlang === "1") {
      this.reggeltlang = "hu-HU"
    }
    if(this.reggeltlang === "2") {
      this.reggeltlang = "en-US"
    }
    if(this.reggeltlang === "3") {
      this.reggeltlang = "de-DE"
    }

    if(this.saylang === "1") {
      this.saylang = "hu-HU"
    }
    if(this.saylang === "2") {
      this.saylang = "en-US"
    }
    if(this.saylang === "3") {
      this.saylang = "de-DE"
    }

    const body = {
      data: {
        cd: Number(`${this.cdSet}`) || this.cd,
        lang: this.lang,
        reggeltlang: this.reggeltlang || this.lang,
        saylang: this.saylang || this.lang,
      }
    }

    console.log(environment.apiurl)
    return this.http.post(`${environment.apiurl}/guilds/${this.router.snapshot.paramMap.get('GuildId')}/update`, {
      auth: {
        authorization: `${this.authToken}`,
        user: this.uid
      },
      data: body,
    });
  }

}
