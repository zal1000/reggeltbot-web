import { Component, OnInit } from '@angular/core';
import { AngularFirestore, combineChange } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  constructor(private db: AngularFirestore, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.getList().subscribe(
      (response) => {
        this.users = response;
        this.loading = false;
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })
  }

  reload() {
    this.getList().subscribe(
      (response) => {
        this.users = response;
        this.loading = false;
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })
  }
  
  getList(): Observable<any> {
    this.loading = true;
    return this.http.get('https://api.zal1000.net/reggeltbot/leaderboard');
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  


}
