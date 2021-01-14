import { Component, OnInit, Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-countsearch',
  templateUrl: './countsearch.component.html',
  styleUrls: ['./countsearch.component.scss']
})
export class CountsearchComponent implements OnInit {
  name: string = "";
  buttons = [
    {
      tag: "Loading...",
      pp: environment.loadgif
    }
  ]
  
  constructor(private db: AngularFirestore,) { }

  

  
  ngOnInit() {

  }

  getUsers() {
    console.log(this.name)
    const btns: { tag: any; pp: any; }[] = [];
    const ref = this.db.firestore.collection('dcusers').where('username', '==', this.name);
    ref.get().then((docs: any) => {
        docs.forEach((doc: any) => {
          btns.push({
            tag: doc.data().tag,
            pp: doc.data().pp,
          })
        });
    }).then(() => {
      if(btns.length === 0) {
        btns.push({
          tag: "Error: user not found",
          pp: environment.error
        })
        this.buttons = btns;
        console.log(btns)
      } else {
        this.buttons = btns;
        console.log(btns)
      }

    })
  }
}
