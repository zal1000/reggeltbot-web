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

  updateSetting(e: MatSlider) {
    this.cdSet = e.value
    this.changed = true;
  }

  async update() {
    console.log(this.cdSet)
    this.changed = false;
    this.sendUpdate().subscribe(
      (response) => {
        this.snackbar.open('Server configuration updated', '', {
          duration: 5000,
        });
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

    this.cd = docdata.cd
    this.name = docdata.name
  }

  sendUpdate(): Observable<any> {
    this.loading = true;
    const body = {
      data: {
        cd: Number(`${this.cdSet}`)
      }
    }

    console.log(environment.apiurl)
    return this.http.post(`${environment.apiurl}/reggeltbot/guildUpdate`, {
      id: `${this.router.snapshot.paramMap.get('GuildId')}`,
      auth: {
        authorization: `${this.authToken}`,
        user: this.uid
      },
      data: body,
    });
  }


}
