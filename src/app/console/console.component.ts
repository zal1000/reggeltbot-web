import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  loggedin: boolean = false;
  loading: boolean = true;
  message: any;
  priceId = environment.stripeids.reggeltbotsub;
  stripePromise = loadStripe(environment.stripekey);
  quantity = 1;


  constructor(public auth: AuthService, public afAuth: AngularFireAuth, private snackBar: MatSnackBar,) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedin = true;
        this.loading = false;
        this.snackBar.open(`Logged in as: ${user.email}`, "Okay", {
          duration: 5000,
        })
      } else {
        this.loggedin = false
        this.loading = false;

      }
    })
  }

  ngOnInit(): void {
    console.log(window.location.hostname)
  }

  async checkout() {
    const stripe = await this.stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      mode: "subscription",
      lineItems: [{price: this.priceId}],
      successUrl: `${window.location.hostname}/success`,
      cancelUrl: `${window.location.hostname}/fail1`,
    });
    if (error) {
      this.snackBar.open(`${error.message}`, 'Okay', {
        duration: 5000,
      })
      console.log(error);
    }
  }

  update(f: NgForm) {
    console.log(f.value)
  }

  login(f: NgForm) {
    this.auth.signIn(f.value.email, f.value.pass)
  }

  register(f: NgForm) {
    this.auth.register(f.value.email, f.value.pass)
  }

  getUser() {
    this.afAuth.user.subscribe(user => {
      console.log(user?.uid)
    })
  }

  googleLogin() {
    this.auth.googleLogin()
  }

  facebookLogin() {
    this.auth.facebookLogin()
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
