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

import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConsoleComponent } from './console/console.component';
import { HomeComponent } from './home/home.component';
import { CountComponent } from './count/count.component';
import { CountsearchComponent } from './countsearch/countsearch.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    HttpClientModule, 
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
