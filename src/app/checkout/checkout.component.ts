import { Component, OnInit, Input, HostListener } from '@angular/core';import { AngularFireFunctions } from '@angular/fire/functions';
import { fromEventPattern } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service'
import { StripeScriptTag } from "stripe-angular"
//declare var StripeCheckout: StripeCheckoutStatic;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  constructor(private auth: AuthService, private functions: AngularFireFunctions, private stripetag: StripeScriptTag) {
    if(!this.stripetag.StripeInstance) {
      this.stripetag.setPublishableKey(environment.stripekey)
    }
  }

  card: any;
  cardErrors: any;

  loading: boolean = false;
  confirmation: any;

  ngOnInit() {
    //this.stripe = Stripe(environment.stripekey);
  }
  
}
