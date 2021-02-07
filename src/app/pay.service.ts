import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private snack: MatSnackBar) { }
  
  async premiumsub() {

  }
}
