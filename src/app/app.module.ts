import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics'
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConsoleComponent } from './console/console.component';
import { HomeComponent } from './home/home.component';
import { CountComponent } from './count/count.component';
import { CountsearchComponent } from './countsearch/countsearch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
<<<<<<< HEAD
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { fromEventPattern } from 'rxjs';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { StripeModule } from "stripe-angular"
import { PremiumComponent } from './premium/premium.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
=======
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
const config = {
  apiKey: "AIzaSyAt2Z0NaWwdWYjY_aekfmXlrxVABYsymaM",
  authDomain: "zal1000.firebaseapp.com",
  databaseURL: "https://zal1000.firebaseio.com",
  projectId: "zal1000",
  storageBucket: "zal1000.appspot.com",
  messagingSenderId: "512279358183",
  appId: "1:512279358183:web:15b9bc444ad56583541042",
  measurementId: "G-V30XXF400W"

};
>>>>>>> parent of 7b33390... asd

@NgModule({
  declarations: [
    AppComponent,
    CountComponent,
    LeaderboardComponent,
    ConsoleComponent,
    HomeComponent,
    CountsearchComponent,
    PremiumComponent,
    SuccessComponent,
    FailureComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    MatButtonModule,
    MatSnackBarModule,
    AngularFireMessagingModule,
    StripeModule.forRoot(environment.stripekey),
=======
>>>>>>> parent of 7b33390... asd
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
