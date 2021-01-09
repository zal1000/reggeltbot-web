import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hun = true;
  eng = true;

  langEng() {
    this.hun = false;
    this.eng = true;
  }  
  langHun() {
    this.hun = true;
    this.eng = false;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
