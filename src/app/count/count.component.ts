import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  reggeltcount = "Loading..." 
  noid = false;
  dcpp = null;
  tag:string = "zal1000#9238";
  dcids = [
    {
        "id": "423925286350880779",
        "tag": "zal1000#9238",
        "pp": "https://cdn.discordapp.com/avatars/423925286350880779/a_2359f5d0b19f0441cad31c91b45b1249.webp",
        "reggeltcount": 159,
        "username": "zal1000"
    }
];
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
      })
  }

  getUserByTag(username: string): Observable<any> {
    return this.http.post('http://localhost:8081/reggeltbot/users', {
      username: username,
    });
  }
// https://api.zal1000.net

// http://localhost:8081

// https://latest---api-zd72hz742a-uc.a.run.app
}
