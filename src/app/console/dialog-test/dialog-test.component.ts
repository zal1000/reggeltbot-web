import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { PayService } from 'src/app/pay.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.scss']
})
export class DialogTestComponent implements OnInit {
  gitlinkable: boolean = true;
  apiurl = environment.zalapi;
  syncing: boolean = false;

  constructor(
        public auth: AuthService, 
        public afAuth: AngularFireAuth, 
        private snackBar: MatSnackBar,
        private pay: PayService,
        private functions: AngularFireFunctions,
        private db: AngularFirestore,
        private http: HttpClient,
        public dialog: MatDialog,
  ) {
    this.afAuth.authState.subscribe(user => {
    //console.log(user?.providerData)
    if(!user?.providerData.find((element: any) => element.providerId == "github.com")) {
      this.gitlinkable = true;
    } else {
      this.gitlinkable = false;
    }
    
  }) }

  ngOnInit(): void {
  }

  githubLink() {
    this.gitlinkable = false;
    this.auth.githubLink();
  }

  githubunlink() {
    this.auth.githubUnLink().then(user => {
      this.gitlinkable = true;
    }).catch(err => {
      this.gitlinkable = false;
    })
  }

  githubrefresh() {
    this.syncing = true;
    const bar = this.snackBar.open('Syncing...')
    const ref = this.db.collection('users').doc(this.auth.userData.uid)
    const doc = ref.get();
    this.auth.userData.providerData.forEach((prov: any) => {
      console.log(prov)
    });
    doc.subscribe((doc: any) => {
      if(doc.exists){
        console.log(doc.data().github.username)
        this.callUpdate(this.auth.userData.uid).subscribe(
          (response) => {
            console.log(response)
          },
          (error) => {
            if(error.status === 200) {
              bar.dismiss()
              this.syncing = false;

              this.snackBar.open(`Account synced successfully`, 'Dismiss', {
                duration: 5000
              })
            } else {
              console.error(error)
              bar.dismiss()
              this.syncing = false;

              this.snackBar.open(`Error syncing Github account: ${error.message}`, 'Dismiss', {
                duration: 10000
              })
            }


          },
          () => {   
            bar.dismiss()
            //complete() callback
            console.debug('Request completed')
  
            //This is actually not needed 
          })
      }

    })

  }

  callUpdate(uid: string): Observable<any> {
    return this.http.get(`${this.apiurl}/auth/github/sync?i=${uid}`);
  }

  logout() {
    this.afAuth.signOut()
  }

}
