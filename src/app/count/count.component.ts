import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, Form, FormBuilder } from '@angular/forms';
import { templateJitUrl } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { CountsearchComponent } from '../countsearch/countsearch.component'

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent implements OnInit, OnDestroy {
  reggeltcount = "Loading..." 
  dcpp = "https://ppllabs.com/wp-content/uploads/2018/10/load.gif";
  tag = "";
  loading = true;
  dcname: any  = "Loading...";
  dcids = [
    {
        "id": "noid",
        "tag": "Loading...",
        "pp": "https://cdn.discordapp.com/avatars/423925286350880779/a_2359f5d0b19f0441cad31c91b45b1249.webp",
        "username": "Loading..."
    }
  ];
  loadinggif = environment.loadgif;
  mySubscription: any;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private http: HttpClient, private router: Router,) { }
  
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams.user)
    console.log(this.route.snapshot.params.dcId);
    if(!this.route.snapshot.params.dcId) {
      this.reggeltcount = "Error: Please specitfy user";
      this.dcpp = environment.error
    } else {
      const ref = this.db.collection('dcusers').doc(this.route.snapshot.params.dcId);
      ref.get().toPromise().then((doc: any) => {
        if(!doc.exists) {
          this.reggeltcount = "Error: User not found"
          this.dcname = null;
          this.dcpp = environment.error
          this.loading = false;
        } else {
          console.log(doc.data())
          this.reggeltcount = `${doc.data().reggeltcount}`
          if(!doc.data().pp) {
            this.dcpp = environment.loadgif;
          } else {
            this.dcpp = doc.data().pp
            this.loading = false;
          }
          
          this.dcname = `${doc.data().username} ennyiszer köszönt be:`
        }
      }).catch(err => {
        this.reggeltcount = `Error: ${err.message}`
        this.dcname = null;
        this.dcpp = environment.error
        this.loading = false;
      })
    }
  }

  countListener(uid: string): Observable<any> {
    this.loading = true;
    const ref = this.db.collection('dcusers').doc(uid).snapshotChanges();
    return ref;
  }
/*
        if(!doc.exists) {
          this.reggeltcount = "err"
        } else {
          const docasd: any = doc;
          console.log(doc.data())
          this.reggeltcount = `${docasd.data().reggeltcount}`
          this.dcpp = docasd.data().pp
        }

              const ref = this.db.collection('dcusers').doc(`423925286350880779`).valueChanges();
      ref.toPromise().then((doc: any) => {
        if(!doc.exists) {
          this.reggeltcount = "err"
        } else {
          const docasd: any = doc;
          console.log(doc.data())
          this.reggeltcount = `${docasd.data().reggeltcount}`
          this.dcpp = docasd.data().pp
        }
      })
*/
  getUser() {
    this.getUserByTag(this.tag).subscribe(
      (response) => {
        this.dcids = response;
        console.log(response)
        console.log(this.tag)
      })
      console.log(this.tag)
  }

  getUserByTag(username: string): Observable<any> {
    return this.http.post('https://latest---api-zd72hz742a-uc.a.run.app/reggeltbot/users', {
      username: username,
    });
  }
// https://api.zal1000.net

// http://localhost:8081

// https://latest---api-zd72hz742a-uc.a.run.app

ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
}
