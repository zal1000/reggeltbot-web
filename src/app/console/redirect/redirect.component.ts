import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private db: AngularFirestore, private route: ActivatedRoute, private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    console.debug(this.route.snapshot.queryParamMap.get('code'))
    this.getList().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  getList(): Observable<any> {
 
    return this.http.get(`https://discord.com/api/v8/users/@me`, {
      headers: {
        'Authentication': `Bearer ${this.route.snapshot.queryParamMap.get('code')}`
      }
    })
  }

  /*

   const headers = new HttpHeaders().set(
     'Content-Type',
    'application/x-www-form-urlencoded;'
   );

   body = 'grant_type=' + password + '&username=' + setData.username + '&password=' + 
   setData.password + '&Client_Id=' + 'XXXXX-5B3C-4A7D-WEW-23BWWWF9B7872';

   return this.http.post('abc.com/authtoken', body , {headers: headers })

  */
}
