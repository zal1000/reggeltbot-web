import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit, OnDestroy {
  reggeltcount = "Loading..." 
  noid = false;
  dcpp = null;
  tag = "";
  dcids = [
    {
        "id": "noid",
        "tag": "Loading...",
        "pp": "https://cdn.discordapp.com/avatars/423925286350880779/a_2359f5d0b19f0441cad31c91b45b1249.webp",
        "username": "Loading..."
    }
];
  mySubscription: any;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private http: HttpClient, private router: Router,) { }
  

  ngOnInit(): void {
    console.log(this.route.snapshot.params.dcId);
    if(this.route.snapshot.params.dcId === "noid") {
      this.reggeltcount = "Error: Please specitfy user";
      this.noid = true;
    } else {
      const ref = this.db.collection('dcusers').doc(`${this.route.snapshot.params.dcId}`);
      ref.ref.get().then(doc => {
        if(!doc.exists) {
          this.reggeltcount = "err"
        } else {
          const docasd: any = doc;
          console.log(doc.data())
          this.noid = false;
          this.reggeltcount = `${docasd.data().reggeltcount}`
          this.dcpp = docasd.data().pp
        }
      })
  } 
  }

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
