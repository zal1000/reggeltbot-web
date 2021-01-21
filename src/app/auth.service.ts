import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import * as firebase from 'firebase/app';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { AngularFireAnalytics } from '@angular/fire/analytics'


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
    .then(() => {
      return null;
    })
    .catch(err => {
      this.errorHandler(err)
    })
  }



  signOut() {
    this.afAuth.signOut().catch(err => {
      this.errorHandler(err)
    })
  }

  errorHandler(err: any) {
    if(err.code === "auth/popup-closed-by-user") {
      return
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