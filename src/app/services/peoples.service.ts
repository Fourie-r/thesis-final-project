// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { PeoplesModel } from '../shared/models/peoples.model';
import { Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { User } from 'src/app/classes/user.model';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable()
export class PeoplesService {
  private peoplesUrl = 'api/getPeoples';

  // Resolve HTTP using the constructor
  constructor(private http: Http, private db: AngularFirestore ) {}
  // private instance variable to hold base url

  // Fetch all existing peoples
  getPeoples(): Observable<PeoplesModel[]> {
    // Using get request
    return (
      this.http
        .get(this.peoplesUrl).pipe(
        // ...and calling .json() on the response to return data
        map((res: Response) => res.json()),
        // ...errors if any
        catchError((error: any) =>
          Observable.throw(error.json().error || 'Server error')
        ))
    );
  }

getPeople(): Observable<any> {

  return this.db.collection('users').valueChanges();
}



  //  Add New peoples
  addPeople(body: Object): Observable<PeoplesModel[]> {
    // let bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http
      .post(this.peoplesUrl, body, options).pipe( // ...using post request
      map((res: Response) => res.json()), // ...and calling .json() on the response to return data
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )); // ...errors if any
  }

  addNewPeople(body: Object) {

    this.db.collection('users')
    .add(body)
    .catch(err => console.log('Error while trying to add new user to db'));
  }
}
