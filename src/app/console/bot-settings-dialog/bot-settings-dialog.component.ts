import { InjectionToken } from '@angular/core';
import { Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';

@Component({
  selector: 'app-bot-settings-dialog',
  templateUrl: './bot-settings-dialog.component.html',
  styleUrls: ['./bot-settings-dialog.component.scss']
})
export class BotSettingsDialogComponent implements OnInit, OnDestroy {

  channelset: any;


  constructor( 
    public dialogRef: MatDialogRef<BotSettingsDialogComponent>,
    ) { }

    @Inject(MAT_DIALOG_DATA)

  ngOnInit(): void {    
    console.log(MAT_DIALOG_DATA)
  }

  ngOnDestroy() {
  }

}
