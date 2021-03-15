import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { PayService } from '../pay.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { coerceStringArray } from '@angular/cdk/coercion';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { BotSettingsDialogComponent } from './bot-settings-dialog/bot-settings-dialog.component';
import { PremiumComponent } from './premium/premium.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  loggedin: boolean = false;
  loading: boolean = true;
  message: any;
  priceId = environment.stripeids.reggeltbotsub;
  stripePromise = loadStripe(environment.stripekey);
  quantity = 1;
  checkoutstate: boolean = true;
  apiurl = environment.apiurl;
  syncing: boolean = false;
  linkedaccounts = {
    google: false,
    github: false,
    facebook: false,
    discord: false
  };
  gitlinkable: boolean = true;
  user: any;
  guilds: any = [
    {
      name: 'Loading...',
      id: 'loading',
    }
  ];
  selectedGuild: any;
  changesInProgress: boolean = false;
  dclinked: any;
  dclinkcode: any;


  prod: boolean = environment.production;

  constructor(
    public auth: AuthService, 
    public afAuth: AngularFireAuth, 
    private snackBar: MatSnackBar,
    private pay: PayService,
    private functions: AngularFireFunctions,
    private db: AngularFirestore,
    private http: HttpClient,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    ) {
    this.afAuth.authState.subscribe(async user => {
      if(user) {
        this.loggedin = true;
        //this.openSnackBar(`Logged in as ${user.email}`)
        this.snackBar.open(`Logged in as: ${user.email}`, "Okay", {
          duration: 5000,
          panelClass: ['snack-login'],
        })
        this.getGuilds()
        this.user = user;
        
        const ref = this.db.collection('users').doc(this.user?.uid);
        const doc: any = await ref.get().toPromise()
        this.dclinked = doc.data().dclinked
        this.dclinkcode = doc.data().dclink

        ref.valueChanges().subscribe((doc: any) => {
          this.loading = false;

          console.log('change val', doc)
          this.dclinked = doc.dclinked
          this.dclinkcode = doc.dclink
          if(doc.dclinked) {
            this.getGuilds()
          }
        })

      } else {
        this.loggedin = false
        this.loading = false;
        this.user = null;

      }
    })

    this.afAuth.authState.subscribe(user => {
      //console.log(user?.providerData)
      if(!user?.providerData.find((element: any) => element.providerId == "github.com")) {
        this.linkedaccounts.github = false;
      } else {
        this.linkedaccounts.github = true;
      }
    })

  }

  async ngOnInit() {
    /*
    const dialogRef = this.dialog.open(DialogTestComponent, {
      width: "1000px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    */
    if(this.router.snapshot.queryParamMap.get('code')) {
      this.loading = true;
      this.auth.dclogin()
    }
  }

  discordlogin() {
    location.href = environment.dcauthurl;
  }

  async getGuilds() {
      this.afAuth.currentUser.then(async user => {
      const guildlist: { name: any; id: any; }[] = [];
      const userref = this.db.firestore.collection('users').doc(user?.uid);
      await userref.get().then(async doc1 => {
        console.log(doc1.data())
        const dcref = this.db.firestore.collection('dcusers').doc(doc1?.data()?.dcid).collection('guilds').where('permissions.MANAGE_MESSAGES', '==', true);
        await dcref.get().then(docs => {
          if(docs.empty) {
            console.log('empty')
          }
          docs.forEach(doc => {
            guildlist.push({
              name: doc.data().name,
              id: doc.id,
            })
          })
        })
      }).catch(err => {
        this.snackBar.open(`Error reading from database! ${err.message}`, 'Dismiss')
      })
      this.guilds = guildlist;
    })
  }

  accountDialog() {
    const dialogRef = this.dialog.open(DialogTestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  settingdialog() {
    const dialogRef = this.dialog.open(BotSettingsDialogComponent, {
      data: {id: this.selectedGuild},
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result === true) {
        this.snackBar.open('Changes saved, but not applied yet', '', {
          duration: 3000,
        });
        this.changesInProgress = true;
      } else if(result === false) {
        this.snackBar.open('Changes canceled', '', {
          duration: 5000,
        })
      } else {
        this.snackBar.open('Changes saved locally', '', {
          duration: 3000,
        })
      }
    });
  }

  premiumDialog() {
    const dialogRef = this.dialog.open(PremiumComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.snackBar.open('Processing...', '<mat-icon>cancel</mat-icon>');
        this.changesInProgress = true;
      } else if(result === false) {
        this.snackBar.open('Canceled', '', {
          duration: 5000,
        })
      } else {
        this.snackBar.open('Canceled', '', {
          duration: 3000,
        })
      }

    });
  }

  async checkout() {
    this.pay.premiumsub()
  }

  login(f: NgForm) {
    this.auth.signIn(f.value.email, f.value.pass)
  }

  register(f: NgForm) {
    this.auth.register(f.value.email, f.value.pass)
  }

  getUser() {
    this.afAuth.user.subscribe(user => {
      console.log(user?.uid)
    })
  }

  googleLogin() {
    this.auth.googleLogin()
  }

  facebookLogin() {
    this.auth.facebookLogin()
  }

  githubLink() {
    this.gitlinkable = false;

    this.auth.githubLink();
  }

  githubunlink() {
    this.auth.githubUnLink().then(user => {
      this.gitlinkable = true;
    }).catch(err => {
      this.gitlinkable = false;
    })
  }

  githubrefresh() {
    this.syncing = true;
    const bar = this.snackBar.open('Syncing...')
    const ref = this.db.collection('users').doc(this.auth.userData.uid)
    const doc = ref.get();
    this.auth.userData.providerData.forEach((prov: any) => {
      console.log(prov)
    });
    doc.subscribe((doc: any) => {
      if(doc.exists){
        console.log(doc.data().github.username)
        this.callUpdate(doc.data().github.username, this.auth.userData.uid).subscribe(
          (response) => {
            console.log(response)
          },
          (error) => {
            if(error.status === 200) {
              bar.dismiss()
              this.syncing = false;

              this.snackBar.open(`Account synced successfully`, 'Dismiss', {
                duration: 5000
              })
            } else {
              console.error(error)
              bar.dismiss()
              this.syncing = false;

              this.snackBar.open(`Error syncing Github account: ${error.message}`, 'Dismiss', {
                duration: 10000
              })
            }


          },
          () => {   
            bar.dismiss()
            //complete() callback
            console.debug('Request completed')
  
            //This is actually not needed 
          })
      }

    })

  }

  callUpdate(name: string, uid: string): Observable<any> {
    return this.http.get(`${this.apiurl}/auth/github/sync?n=${name}&i=${uid}`);
  }

  logout() {
    this.loading = true;
    this.afAuth.signOut().then(() => {
      this.loading = false;
    }).catch(err => {
      this.loading = true;
      console.warn(err);
    })
  }

}