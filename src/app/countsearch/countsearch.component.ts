import { Component, OnInit, Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-countsearch',
  templateUrl: './countsearch.component.html',
  styleUrls: ['./countsearch.component.scss']
})
export class CountsearchComponent implements OnInit {
  form!: FormGroup;
  buttons =[
    {
      tag: "Please search for user",
      pp: null,
      id: null,
      err: true,
    }
  ]
  name: any;

  loading = false;
  pure = true;

  constructor(private db: AngularFirestore, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl()
   })
  }

  getUsers(f: NgForm) {
    this.loading = true;
    this.pure = false;
    console.log(f.value)
    const name = f.value.name;
    console.log(name)
    const btns: { tag: any; pp: any; id: any; err: boolean; }[] = [];
    const ref = this.db.firestore.collection('dcusers').where('username', '==', name);
    ref.get().then((docs: any) => {
        docs.forEach((doc: any) => {
          btns.push({
            tag: doc.data().tag,
            pp: doc.data().pp,
            id: doc.id,
            err: false,
          })
        });
    }).then(() => {
      if(btns.length === 0) {
        btns.push({
          tag: "Error: user not found",
          pp: environment.error,
          id: null,
          err: true,
        })
        this.buttons = btns;
        console.log(btns)
      } else {
        this.buttons = btns;
        console.log(btns)
      }
      this.loading = false;
    }).catch(err => {
      console.log(err)
      this.loading = false;
    })
  }
  
}
