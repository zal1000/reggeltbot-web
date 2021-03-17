import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';
import { AddComponent } from '../../videcheck/add/add.component';

@Component({
  selector: 'app-issues-list-n',
  templateUrl: './issues-list-n.component.html',
  styleUrls: ['./issues-list-n.component.scss']
})
export class IssuesListNComponent implements OnInit {
  user: any;
  loading: boolean = true;
  issues = [
    {
      id: 'loading...',
      author: 'Loading...',
      status: 'new',
      authorimg: environment.loadgif,
      authorname: 'Loading...',
      issue: 'Loading...',
      time: 'Loading...',

    }
  ]

  @Input()
  vidid!: string;
  
  fetched = false;
  constructor(    
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    public auth: AuthService, 
    private router: ActivatedRoute,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    ) {
      const ref = this.db.collection('waik').doc('norbi').collection('videocheck', ref => ref.where('videoid', '==', this.vidid || null).where('status', '!=', 'ignored'));
      ref.snapshotChanges().subscribe(async (doc: any) => {
        //console.log(doc);
        await this.fetch()
      })

      this.afAuth.authState.subscribe(user => {
        if(user) {
          this.user = user;
        } else {
          this.user = null;
        }

      })
    }

  ngOnInit(): void {
  }

  async fetch() {

    this.loading = true;
    const ref = this.db.collection('waik').doc('norbi').collection('videocheck', ref => ref.where('videoid', '==', this.vidid || null));
    
    const docs = await ref.get().toPromise();
    //if() {
      let issues: { id: string; author: any; status: any; authorimg: any; authorname: any; issue: any; time: any; }[] = []

      if(docs.empty) {
        console.log("empty")
        issues.push({
          id: "empty",
          author: "empty",
          status: "new",
          authorimg: environment.error,
          authorname: "No videos",
          issue: "No videos",
          time: "00:00",
        })
        this.issues = issues;

        this.fetched = true;
        this.loading = false;
      } else {
        docs.forEach(async doc => {
          const dcref = this.db.doc(`dcusers/${doc.data().author}`)
          const dcdoc =  dcref.get();
          const docdata: any = doc.data();
          const dcdocdata: any = (await dcdoc.toPromise()).data();
          //console.log((await dcdoc.toPromise()).data())
            issues.push({
              id: doc.id,
              author: docdata.author,
              status: docdata.status,
              authorimg: dcdocdata.pp,
              authorname: dcdocdata.tag,
              issue: docdata.issue,
              time: docdata.time,      
            })
  
            this.issues = issues;
        })

        this.fetched = true;
        this.loading = false;
      }


    //}


  }

  async markasNew(id: any) {
    const ref = this.db.doc(`waik/norbi/videocheck/${id}`)

    ref.update({
      status: 'new'
    }).then(() => {
      this.fetch()
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
      this.fetch()
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
      this.fetch()
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
      this.fetch()
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
      data: { id: this.vidid },
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);

      if(result === false) return;

      const userref = this.db.collection('users').doc(this.user.uid);

      const doc = await userref.get().toPromise();
      
      const docany : any = doc.data();


      console.log(doc.data())
      this.db.collection('waik').doc('norbi').collection('videocheck').add({
        issue: result[0],
        time: result[1],
        status: 'new',
        author: docany.dcid || null,
        videoid: this.vidid,
      }).then(r => {
        this.fetch()
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
