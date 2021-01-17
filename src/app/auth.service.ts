import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user!: Observable<firebase.default.User>;

  constructor(private firebaseAuth: AngularFireAuth) { }

  async signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        return value;
      })
      .catch(err => {
        throw new Error(err)
      });
  }

  async login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        return value;
      })
      .catch(err => {
        throw new Error(err)
      });
  }

  async logout() {
    this.firebaseAuth.signOut();
  }
}
