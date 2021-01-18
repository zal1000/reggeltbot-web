import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  loggedin: boolean = false;
  loading: boolean = true;

  constructor(public auth: AuthService, public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedin = true;
        this.loading = false;
      } else {
        this.loggedin = false
        this.loading = false;

      }
    })
  }

  ngOnInit(): void {
  }

  login(f: NgForm) {
    this.auth.signIn(f.value.email, f.value.pass)
  }

  getUser() {
    this.afAuth.user.subscribe(user => {
      console.log(user?.uid)
    })
  }

  googleLogin() {
    this.auth.googleLogin()
  }

  logout() {
    this.loading = true;
    this.afAuth.signOut().then(() => {
      this.loading = false;
    }).catch(err => {
      this.loading = true;
      console.warn(err);
    })
  }

}
