import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { AngularFireAnalytics } from '@angular/fire/analytics';


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

  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.anal.setUserId(user.uid)
        this.userData = user;
        this.loggedin = true;

      } else {
        this.userData = null;
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
    let provider: any = new firebase.default.auth.GithubAuthProvider();
    provider.addScope('public_repo');
    provider.addScope('user')
    firebase.default.auth().currentUser?.linkWithPopup(provider).then((userCredential: any) => {
      // Get the GitHub username.
      console.log(userCredential.additionalUserInfo.username);
      // Get GitHub additional user profile.
      console.log(userCredential.additionalUserInfo.profile);

      console.log(userCredential)
    })
  }



  signOut() {
    this.afAuth.signOut().catch(err => {
      this.errorHandler(err)
    })
  }

  errorHandler(err: any) {
    if(err.code === "auth/popup-closed-by-user") {
      console.warn(err)
    } else {
      this.snackBar.open(`${err.message}`, "Dismiss")
    }
  }
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}