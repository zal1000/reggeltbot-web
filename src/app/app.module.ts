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
import { fromEventPattern } from 'rxjs';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { StripeModule } from "stripe-angular"
import { PremiumComponent } from './premium/premium.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';

import { PrivacyComponent } from './privacy/privacy.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';

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
    PrivacyComponent,
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
    MatButtonModule,
    MatSnackBarModule,
    AngularFireMessagingModule,
    StripeModule.forRoot(environment.stripekey),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
