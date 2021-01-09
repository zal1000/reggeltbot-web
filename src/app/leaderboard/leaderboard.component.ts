import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users = [
    {
      asd: "asdf",
      name: "asdfg"
    },    
    {
      asd: "asdfg",
      name: "asdfgh"
    },
  ]

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    const ref = this.db.collection('dcusers', ref => ref.where('reggeltcount', '!=', null).limit(20)).get();

    ref.forEach(doc => {
      this.users.push();
    })
  }

}
