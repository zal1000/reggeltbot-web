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
  apiurl = environment.zalapi;

  constructor(
    public auth: AuthService, 
    public afAuth: AngularFireAuth, 
    private snackBar: MatSnackBar,
    private pay: PayService,
    private functions: AngularFireFunctions,
    private db: AngularFirestore,
    private http: HttpClient,
    ) { 
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.loggedin = true;
        //this.openSnackBar(`Logged in as ${user.email}`)
        this.loading = false;
        this.snackBar.open(`Logged in as: ${user.email}`, "Okay", {
          duration: 5000,
        })
      } else {
        this.loggedin = false
        this.loading = false;

      }
    })
  }

  ngOnInit(): void {
    console.log(window.location.hostname)
  }

  async checkout() {
    this.pay.premiumsub()
  }

  openSnackBar(message: string) {
    //his.snackBar.open(message);
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
    this.auth.githubLink();
  }

  githubunlink() {
    this.auth.githubUnLink()
  }

  githubrefresh() {
    const bar = this.snackBar.open('Syncing...', 'Dismiss')
    const ref = this.db.collection('users').doc(this.auth.userData.uid)
    const doc = ref.get();
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
              this.snackBar.open(`Account synced successfully`, 'Dismiss', {
                duration: 5000
              })
            } else {
              console.error(error)
              bar.dismiss()
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
