import { Component, OnInit } from '@angular/core';
import { AngularFirestore, combineChange } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  users = null;
  mySubscription: any;

  constructor(private db: AngularFirestore, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.getList().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {                              //error() callback
        console.error('Request failed with error')
      },
      () => {                                   //complete() callback
        console.error('Request completed')      //This is actually not needed 
      })
  }
  
  getList(): Observable<any> {
    return this.http.get('https://api.zal1000.net/reggeltbot/leaderboard');
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  
    reload() {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
        }
      });
    }

}
