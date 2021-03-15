import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  issue: any;
  time: any;
  video: any;

  constructor() { }

  ngOnInit(): void {
  }

  close(e: any) {

  }

}
