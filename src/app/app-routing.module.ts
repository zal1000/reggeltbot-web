import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountComponent } from './count/count.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConsoleComponent } from './console/console.component';
import { CountsearchComponent  } from './countsearch/countsearch.component'
import { componentFactoryName } from '@angular/compiler';
import { PremiumComponent } from './premium/premium.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { PrivacyComponent } from './privacy/privacy.component'; 


const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'count', component: CountsearchComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'console', component: ConsoleComponent },
  { path: 's/premium', component: PremiumComponent },
  { path: 's/success', component: SuccessComponent },
  { path: 's/fali', component: FailureComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
