import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  loggedin: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
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
      console.warn(err)
    })
  }
  register(email: string, pass: string) {
    this.afAuth.createUserWithEmailAndPassword(email, pass).then((res)  => {

    }).catch(err => {
      console.warn(err)
    })
  }

  googleLogin() {
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
  }

  facebookLogin() {
    this.afAuth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
    .then(() => {
      return null;
    })
    .catch(err => {
      throw new Error(err)
    })
  }

  signOut() {
    this.afAuth.signOut()
  }
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}