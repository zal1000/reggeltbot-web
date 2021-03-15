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
  apiurl = environment.zalapi;
  syncing: boolean = false;
  linkedaccounts = {
    google: false,
    github: false,
    facebook: false,
    discord: false
  };
  accounts: Accounts = {
    google: {
      displayName: "Loading...",
      email: "Loading...",
      photoURL: environment.loadgif,
    },
    facebook: {
      displayName: "Loading...",
      email: "Loading...",
      photoURL: environment.loadgif,
    },
    github: {
      displayName: "Loading...",
      email: "Loading...",
      photoURL: environment.loadgif,
    },
    
  }
  user: any;
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
      user = user;
    console.log(user?.providerData)
    if(user?.providerData.find((element: any) => element.providerId == "github.com")) {
      const ref = user?.providerData.find((element: any) => element.providerId == "github.com")
      this.accounts.github.displayName = ref?.displayName;
      this.accounts.github.email = ref?.email;
      this.linkedaccounts.github = true;
    } else {
      this.linkedaccounts.github = false;
    }

    if(user?.providerData.find((element: any) => element.providerId == "google.com")) {
      const ref = user?.providerData.find((element: any) => element.providerId == "google.com")
      this.accounts.google.displayName = ref?.displayName;
      this.accounts.google.email = ref?.email;
      this.linkedaccounts.google = true;
    } else {
      this.linkedaccounts.google = false;
    }

    if(user?.providerData.find((element: any) => element.providerId == "facebook.com")) {
      const ref = user?.providerData.find((element: any) => element.providerId == "facebook.com")
      this.accounts.google.displayName = ref?.displayName;
      this.accounts.google.email = ref?.email;
      this.linkedaccounts.google = true;
      this.linkedaccounts.facebook = true;
    } else {
      this.linkedaccounts.facebook = false;
    }
    
  }) }

  ngOnInit(): void {
  }

  githubLink() {
    this.linkedaccounts.github = true;
    this.auth.githubLink();
  }

  githubunlink() {
    this.auth.githubUnLink().then(user => {
      this.linkedaccounts.github = false;
    }).catch(err => {
      this.linkedaccounts.github = true;
    })
  }

  facebookLink() {

  }
  googleLink() {

  }

  discordLink() {

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

interface Accounts {
  google: {
    displayName: string | null | undefined,
    photoURL: string | null | undefined,
    email: string | null | undefined
  },
  facebook: {
    displayName: string | null | undefined,
    photoURL: string | null | undefined,
    email: string | null | undefined
  },
  github: {
    displayName: string | null | undefined,
    photoURL: string | null | undefined,
    email: string | null | undefined
  }
}