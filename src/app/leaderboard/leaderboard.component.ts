import { Component, OnInit } from '@angular/core';
import { AngularFirestore, combineChange } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireAnalytics } from '@angular/fire/analytics'
import { AngularFireMessaging } from '@angular/fire/messaging'
import { coerceStringArray } from '@angular/cdk/coercion';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  users = null;
  mySubscription: any;
  loading = true;
  loadinggif = environment.loadgif;
  error = {
    status: false,
    code: 0,
    message: "Error",
    full: "Loading...",
    image: environment.error
  }
  notfoundimg = environment.noimg;
  membercount: string = "25";
  online: boolean = false;

  apiurl = environment.apiurl;

  constructor(private db: AngularFirestore, private http: HttpClient, private router: Router, private anal: AngularFireAnalytics, private msg: AngularFireMessaging) { }

  ngOnInit(): void {
    this.online = window.navigator.onLine;

    if (!location.search.slice(1).split("&")[0].split("=")[1]) {
      this.membercount = "25";
    } else {
      this.membercount = location.search.slice(1).split("&")[0].split("=")[1];
    }

    if (this.online) {
      this.getList().subscribe(
        (response) => {
          this.users = response;

          console.log(response)
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.error.status = true;
        },
        () => {                                   //complete() callback
          console.debug('Request completed')
          this.error.status = false;
          this.loading = false;

          //This is actually not needed 
        })
    }
    else {
      this.loading = false;
    }
  }

  reload() {
    this.online = window.navigator.onLine;

    this.anal.logEvent('leaderboarreload').then(e => {
      console.log(e)
    }).catch(e => {
      console.warn(e)
    })

    if (this.online) {
      this.getList().subscribe(
        (response) => {
          this.users = response;
          this.loading = false;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error', error)
          this.loading = false;
          this.error.status = true;
          this.error.code = error.code;
          this.error.message = error.message;
          this.error.full = error;

        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })
    }
  }

  getList(): Observable<any> {
    this.loading = true;
    return this.http.get(`${this.apiurl}/reggeltbot/leaderboard?m=${this.membercount}`);
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
