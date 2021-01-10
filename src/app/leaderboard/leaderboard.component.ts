import { Component, OnInit } from '@angular/core';
import { AngularFirestore, combineChange } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users = null;

  constructor(private db: AngularFirestore, private http: HttpClient) { }

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

}
