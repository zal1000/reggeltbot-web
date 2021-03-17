import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AddvidComponent } from './addvid/addvid.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: any;
  user: any;

  constructor(
    private db: AngularFirestore, 
    private snackbar: MatSnackBar, 
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    ) {

    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })

    const ref = this.db.collection('waik').doc('norbi').collection('videos');
    ref.snapshotChanges().subscribe(async doc => {
      //console.log(doc);
      ref.get().toPromise().then(docs => {
        let array: { id: string; name: any; status: any; }[] = [];
        docs.forEach(snap => {
          array.push({
            id: snap.id,
            name: snap.data().name,
            status: snap.data().active,
          });
        })
        console.log(array)
        this.videos = array;
      })
    })
  }

  ngOnInit(): void {
  }

  markAsActive(id: any) {
    const ref = this.db.collection('waik').doc('norbi').collection('videos').doc(id);

    ref.update({
      active: true,
    }).then(d => {
      this.snackbar.open('Marked as active', 'Dismiss', {
        duration: 5000,
      })
    }).catch(e => {
      console.error(e);
      this.snackbar.open(`Error marking as active ${e.message}`, 'Dismiss')
    })
  }

  markAsInactive(id: any) {
    const ref = this.db.collection('waik').doc('norbi').collection('videos').doc(id);

    ref.update({
      active: false,
    }).then(d => {
      this.snackbar.open('Marked as inactive', 'Dismiss', {
        duration: 10000,
      })
    }).catch(e => {
      console.error(e);
      this.snackbar.open(`Error marking as inactive ${e.message}`, 'Dismiss')
    })
  }

  add() {
    const dialogRef = this.dialog.open(AddvidComponent, {
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
      this.db.collection('waik').doc('norbi').collection('videos').add({
        name: result[0],
        active: true,
      }).then(r => {
        this.snackbar.open(`Video added (${r.id})`, 'Dismiss', {
          duration: 5000,
        })
      }).catch(e => {
        this.snackbar.open(`Error! ${e.message}`, 'Dismiss');
        console.error(e)

      })
    });
  }



  discordlogin() {
    location.href = environment.dcauthurlvid;
  }

}
