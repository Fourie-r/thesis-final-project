import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.currentUser = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return from(
      this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then((user: any) => {
          const userRef: AngularFirestoreDocument<User> = this.db.doc(
            `users/${user.user.uid}`
          );
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl:
              'https://firebasestorage.googleapis.com/v0/b/thesis-app-db6d7.appspot.com/o/doggy1.jpg?alt=media&token=c3c7094b-31a7-46e9-afcc-6c421dc55878'
          };
          userRef.set(updatedUser);
          return true;
        })
        .catch(err => {
          console.log(err);
          return false;
        })
    );
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(user => true)
        .catch(err => {
          console.log(err);
          return false;
        })
    );
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(
        new Alert('You have successfully logged out', AlertType.Success)
      );
    });
  }
}
