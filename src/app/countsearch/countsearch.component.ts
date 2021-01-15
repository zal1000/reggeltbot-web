import { Component, OnInit, Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countsearch',
  templateUrl: './countsearch.component.html',
  styleUrls: ['./countsearch.component.scss']
})
export class CountsearchComponent implements OnInit {
  form!: FormGroup;
  buttons = [
    {
      tag: "Loading...",
      pp: environment.loadgif
    }
  ]
  name: any;

  constructor(private db: AngularFirestore, private fb: FormBuilder) { }


  
  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
    })
  }

  async getUsers() {
    console.log(this.name.value)
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
