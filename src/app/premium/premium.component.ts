import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {
  title = "angular-stripe";
  priceId = "price_1IC5z5I6tCame7CcGpWVH4dI";
  product = {
    title: "Classic Peace Lily",
    subTitle: "Popular House Plant",
    description:
      "Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.",
    price: 18.0,
  };
  quantity = 1;
  stripePromise = loadStripe(environment.stripekey);
  constructor() { }

  ngOnInit(): void {
  }

  async checkout() {
    // Call your backend to create the Checkout session.
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      mode: "subscription",
      lineItems: [{price: this.priceId}],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/fail1`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }
  }

}
