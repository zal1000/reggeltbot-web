import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  loggedin: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private anal: AngularFireAnalytics,
    private http: HttpClient,
    private router: ActivatedRoute,
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.anal.setUserId(user.uid)
        this.userData = user;
        this.loggedin = true;

      } else {
        this.userData = {
          state: false,
        };
        this.loggedin = false
      }
    })
  }

  async getUser() {
    return this.afAuth.authState.toPromise();
  }

  user(): Observable<any> {
    return this.userData;
  }

  signIn(email: string, pass: string) {
    this.afAuth.signInWithEmailAndPassword(email, pass)
    .then((res) => {
    }).catch(err => {
      this.errorHandler(err)
    })
  }
  register(email: string, pass: string) {
    this.afAuth.createUserWithEmailAndPassword(email, pass).then((res)  => {

    }).catch(err => {
      this.errorHandler(err)
    })
  }

  googleLogin() {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).catch(err => {
      this.errorHandler(err)
    })
  }

  facebookLogin() {
    this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
    .catch(err => {
      this.errorHandler(err)
    })
  }

  googleLink() {
    firebase.default.auth().currentUser?.linkWithPopup(new firebase.default.auth.GoogleAuthProvider()).catch(err => {
      this.errorHandler(err)
    })
  }

  facebookLink() {
    firebase.default.auth().currentUser?.linkWithPopup(new firebase.default.auth.FacebookAuthProvider()).catch(err => {
      this.errorHandler(err)
    })
  }

  async githubLink() {
    const linkingbar = this.snackBar.open('Linking account...', 'Dismiss')
    let provider: any = new firebase.default.auth.GithubAuthProvider();
    provider.addScope('read:user');
    provider.addScope('user:email');
    firebase.default.auth().currentUser?.linkWithPopup(provider).then((userCredential: any) => {
      this.afAuth.currentUser.then(user => {
        console.log(userCredential)
        console.log(user?.uid)
        this.afs
        .collection('users')
        .doc(user?.uid)
        .update({
          github: {
            username: userCredential.additionalUserInfo.username,
            token: userCredential.credential.accessToken,
          }
        })
        .then(doc => {
          linkingbar.dismiss()
          this.snackBar.open('Account succesfuly linked', 'Dismiss', {
            duration: 3000,
          })
        })
        .catch(err => {
          linkingbar.dismiss()
          console.warn(err)
          this.snackBar.open(`Error linking account: ${err.message}`, 'Dismiss')
        })
      })
    }).catch(err => {
      linkingbar.dismiss()
      console.warn(err)
      this.snackBar.open(`Error linking account: ${err.message}`, 'Dismiss')
    })

  }

  async githubUnLink() {
    firebase.default.auth().currentUser?.unlink('github.com')
    this.snackBar.open('Account succesfuly unlinked', 'Dismiss', {
      duration: 5000,
    })
  }

  dclogin() {

    this.http.get(`${environment.apiurl}/dclogin?code=${this.router.snapshot.queryParamMap.get('code')}&from=${location.href}`).toPromise().then((res: any) => {
      console.log(res)
      firebase.default.auth().signInWithCustomToken(res.token).then(() => {
        window.location.search = ""
      })
      //window.location.search = ""
    })



  }

  signOut() {
    this.afAuth.signOut().catch(err => {
      this.errorHandler(err)
    })
  }

  errorHandler(err: any) {
    if(err.code === "auth/popup-closed-by-user") {
      console.warn(err);
    } else {
      this.snackBar.open(`${err.message}`, "Dismiss");
      console.warn(err);
    }
  }
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  providerData: object;
}