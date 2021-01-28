import { Component, OnInit, Input  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { CountComponent } from '../count/count.component';

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
      id: "",
      err: false,
      loading: true,
    }
  ]
  name: any;
  empty = true;
  dcid!: string;
  loading = false;
  pure = true;

  constructor(private db: AngularFirestore, private fb: FormBuilder) { }
  
  ngOnInit() {
    if(location.search.slice(1).split("&")[0].split("=")[1]){
      this.empty = false;
      this.pure = false;
      this.buttons.push({
        tag: "Please search for user",
        pp: null,
        id: location.search.slice(1).split("&")[0].split("=")[1],
        err: false,
        loading: false,
      })
      this.dcid = location.search.slice(1).split("&")[0].split("=")[1]
    }
    console.log(location.search.slice(1).split("&")[0].split("=")[1])
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
    const btns: { tag: any; pp: any; id: any; err: boolean; loading: boolean; }[] = [];
    const ref = this.db.firestore.collection('dcusers').where('username', '==', name);
    ref.get().then((docs: any) => {
        docs.forEach((doc: any) => {
          btns.push({
            tag: doc.data().tag,
            pp: doc.data().pp,
            id: doc.id,
            err: false,
            loading: false,
          })
        });
    }).then(() => {
      if(btns.length === 0) {
        btns.push({
          tag: "Error: user not found",
          pp: environment.error,
          id: null,
          err: true,
          loading: false,
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
