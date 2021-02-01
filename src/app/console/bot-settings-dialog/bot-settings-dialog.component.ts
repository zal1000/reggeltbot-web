import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-bot-settings-dialog',
  templateUrl: './bot-settings-dialog.component.html',
  styleUrls: ['./bot-settings-dialog.component.scss']
})
export class BotSettingsDialogComponent implements OnInit, OnDestroy {

  form = new FormControl({
    ch: new FormControl(),
  });

  channels: object = [
    {name: 'channel name', id: 'channel id'},
    {name: 'channel name2', id: 'channel id2'},
  ]

  channelset: any;

  constructor() {

  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(x => {
      const d = JSON.stringify(x);
      console.log(d);
    })
  }

  ngOnDestroy() {
    console.log(this.channelset)
    localStorage.setItem('test', 'asd')
  }

}
