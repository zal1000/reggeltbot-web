import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { CountComponent } from '../count/count.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-countsearch',
  templateUrl: './countsearch.component.html',
  styleUrls: ['./countsearch.component.scss']
})
export class CountsearchComponent implements OnInit {
  form!: FormGroup;
  buttons = [
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
  online: boolean = false;

  constructor(private db: AngularFirestore, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.online = window.navigator.onLine;

    const ammount = this.route.snapshot.queryParamMap.get('m');

    if (ammount) {
      this.empty = false;
      this.pure = false;
      this.buttons.push({
        tag: "Please search for user",
        pp: null,
        id: ammount,
        err: false,
        loading: false,
      })
      this.dcid = ammount;
    }
    console.log(ammount)
    this.form = new FormGroup({
      name: new FormControl()
    })
  }

  getUsers(f: NgForm) {
    this.online = window.navigator.onLine;

    if (this.online) {
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
        if (btns.length === 0) {
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
}
