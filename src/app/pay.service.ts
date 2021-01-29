import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  stripePromise = loadStripe(environment.stripekey);

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private snack: MatSnackBar) { }
  
  async premiumsub() {
    const stripe = await this.stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      mode: "subscription",
      lineItems: [{price: environment.stripeids.reggeltbotsub}],
      successUrl: `${window.location.hostname}/console`,
      cancelUrl: `${window.location.hostname}/console`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
      this.snack.open(`Error: ${error.message}`, 'Okay')
    }
  }
}
