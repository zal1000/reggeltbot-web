import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountComponent } from './count/count.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConsoleComponent } from './console/console.component';
import { CountsearchComponent  } from './countsearch/countsearch.component'
import { componentFactoryName } from '@angular/compiler';
import { PrivacyComponent } from './privacy/privacy.component'; 
import { BotSettingsComponent } from './console/bot-settings/bot-settings.component';
import { RedirectComponent } from './console/redirect/redirect.component';
import { VideocheckComponent } from './waik/videocheck/videocheck.component';


const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'count', component: CountsearchComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'console', component: ConsoleComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'console/redirect', component: RedirectComponent },
  { path: 'console/:GuildId', component: BotSettingsComponent },
  { path: 'waik/videocheck', component: VideocheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
