import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.scss']
})
export class PremiumComponent implements OnInit {

  constructor(private auth: AuthService) { }

  @ViewChild('cardElement')
  cardElement!: ElementRef;
  
  stripe: any;
  card: any;
  cardErrors: any;
  confirmation: any;
  loading = false;
  apiurl = environment.apiurl;
  amount!: number;
  description!: string;

  ngOnInit(): void {
    this.stripe = Stripe(environment.stripekey);
    const elements = this.stripe.elements();

    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({ error }) => {
        this.cardErrors = error && error.message;
    });
  }

}
