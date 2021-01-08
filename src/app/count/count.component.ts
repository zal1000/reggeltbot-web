import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  reggeltcount = "Loading..." 
  noid = false;
  dcpp = null;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }
  

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
          //asd
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
/*
{
    const docref = this.db.collection('dcusers').doc(this.route.snapshot.params.dcId);
    docref.ref.get().then(doc => {
      if(doc.exists) {
        let doc: any;
        this.reggeltcount = `${doc.data().reggeltcount}`
      } else {
        this.reggeltcount = "Cannot find user"
      }
    });
  }
*/
}
