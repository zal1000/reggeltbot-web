import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {

  constructor(private auth: AuthService) { }

  handler!: StripeCheckoutHandler;

  confirmation: any;
  loading = false;
  apiurl = environment.apiurl;

  ngOnInit(): void {
    this.handler = StripeCheckout.configure({
      key: environment.stripekey,
      image: '/your-avatar.png',
      locale: 'auto',
      source: async (source: any) => {
        this.loading = true;
        const user: any = await this.auth.getUser();
        await fetch(`${this.apiurl}/stripe/reggeltbot/premium?u=${user.uid}`, {
          method: 'POST',
        }).then(res => {
          this.confirmation = res.json();
        }).catch(err => {
          this.confirmation = err;
        })

        this.loading = false;

      }
    });
  }

}
