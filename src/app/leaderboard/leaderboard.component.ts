import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboarddocs = 
    {
      asd: "asdf",
      asd2: "asdfg"
    }

  constructor() { }

  ngOnInit(): void {
  }

}
