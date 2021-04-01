import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit, resolveForwardRef, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import { AddComponent } from '../videcheck/add/add.component';
@Component({
  selector: 'app-videocheck',
  templateUrl: './videocheck.component.html',
  styleUrls: ['./videocheck.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideocheckComponent implements OnInit {
  white = 'white';
  user: any;
  loading: boolean = true;
  videos = [
    {
      id: 'loading...',
      name: 'Loading...'
    }
  ]
  fetched = false;

  constructor(
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    public auth: AuthService, 
    private router: ActivatedRoute,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    public message: AngularFireMessaging,
    ) {

      const ref = this.db.collection('waik').doc('norbi').collection('videos', ref => ref.where('active', '==', true));
      ref.snapshotChanges().subscribe(async doc => {
        //console.log(doc);
        ref.get().toPromise().then(docs => {
          let array: { id: string; name: any; }[] = [];
          docs.forEach(snap => {
            array.push({
              id: snap.id,
              name: snap.data().name,
            });
          })
          console.log(array)
          this.videos = array;
        })
      })

      this.afAuth.authState.subscribe(user => {
        if(user) {
          this.user = user;
        } else {
          this.user = null;
        }

      })


    }

  async ngOnInit(): Promise<void> {

    if(this.router.snapshot.queryParamMap.get('code')) {
      this.auth.dclogin()
    }



    //this.fetch();
  }

  async fetch() {


  }

  async markasNew(id: any) {
    const ref = this.db.doc(`waik/norbi/videocheck/${id}`)

    ref.update({
      status: 'new'
    }).then(() => {
      //this.fetch()
      this.snackbar.open('Marked as New', 'Dismiss', {
        duration: 3000,
      })
    }).catch(e => {
      this.snackbar.open('Error marking as new!', 'Dismiss')
      console.error(e)
    })

  }
  async markasAcknowledged(id: any) {
    const ref = this.db.doc(`waik/norbi/videocheck/${id}`)

    ref.update({
      status: 'acknowledged'
    }).then(() => {
      //this.fetch()
      this.snackbar.open('Marked as acknowledged', 'Dismiss', {
        duration: 3000,
      })
    }).catch(e => {
      this.snackbar.open('Error marking as acknowledged!', 'Dismiss')
      console.error(e)

    })

  }
  async markasResolved(id: any) {
    const ref = this.db.doc(`waik/norbi/videocheck/${id}`)

    ref.update({
      status: 'resolved'
    }).then(() => {
      //this.fetch()
      this.snackbar.open('Marked as resolved', 'Dismiss', {
        duration: 3000,
      })
    }).catch(e => {
      this.snackbar.open('Error marking as resolved!', 'Dismiss')
      console.error(e)

    })

  }

  async markasMuted(id: any) {
    const ref = this.db.doc(`waik/norbi/videocheck/${id}`)

    ref.update({
      status: 'ignored'
    }).then(() => {
      //this.fetch()
      this.snackbar.open('Ignored', 'Dismiss', {
        duration: 3000,
      })
    }).catch(e => {
      this.snackbar.open('Error!', 'Dismiss')
      console.error(e)

    })
  }

  discordlogin() {
    location.href = environment.dcauthurlvid;
  }

  add() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: "800px",
      maxHeight: "600px",
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);

      if(result === false) return;

      const userref = this.db.collection('users').doc(this.user.uid);

      const doc = await userref.get().toPromise();
      
      const docany : any = doc.data();


      console.log(doc.data())
      this.db.collection('waik').doc('norbi').collection('videocheck').add({
        issue: result[1],
        time: result[2],
        video: result[0],
        status: 'new',
        author: docany.dcid || null
      }).then(r => {
        this.snackbar.open(`Issue added (${r.id})`, 'Dismiss', {
          duration: 5000,
        })
      }).catch(e => {
        this.snackbar.open(`Error! ${e.message}`, 'Dismiss');
        console.error(e)

      })
    });
  }
}
