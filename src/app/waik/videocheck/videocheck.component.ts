import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-videocheck',
  templateUrl: './videocheck.component.html',
  styleUrls: ['./videocheck.component.scss']
})
export class VideocheckComponent implements OnInit {

  issues = [
    {
      id: 'loading...',
      author: 'Loading...',
      status: 'new',
      authorimg: environment.loadgif,
      authorname: 'Loading...',
      issue: 'Loading...'
    }
  ]

  constructor(
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    ) { }

  async ngOnInit(): Promise<void> {
    this.start()
    this.snackbar.open('loaded', 'dismiss')

    const ref = this.db.collection('waik').doc('norbi').collection('videocheck');

    const docs = ref.get();
    (await docs.toPromise()).forEach(async doc => {
      const dcref = this.db.doc(`dcusers/${doc.data().author}`)
      const dcdoc =  dcref.get();
      const docdata: any = doc.data();
      const dcdocdata: any = (await dcdoc.toPromise()).data();
      this.issues.push({
        id: doc.id,
        author: docdata.author,
        status: docdata.status,
        authorimg: dcdocdata.pp,
        authorname: dcdocdata.tag,
        issue: docdata.issue,
      })

    })
    console.log(this.issues)

    ref.valueChanges(() => {
      this.issues = [];
      this.snackbar.open('Changes detected', 'Update').onAction().subscribe(async a => {
        const docs = ref.get();
        (await docs.toPromise()).forEach(async doc => {
          const dcref = this.db.doc(`dcusers/${doc.data().author}`)
          const dcdoc = await dcref.get().toPromise();
          const docdata: any = doc.data();
          const dcdocdata: any = dcdoc.data();
          this.issues.push({
            id: doc.id,
            author: docdata.author,
            status: docdata.status,
            authorimg: dcdocdata.pp,
            authorname: dcdocdata.tag,
            issue: docdata.issue,
          })

        })
        console.log(this.issues)
      })
    })
  
  }

  async start() {
  }
}
