import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../classes/user.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor( private router: Router, private alertService: AlertService) {
    this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string ): Observable<boolean> {

    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    return of(true);
  }

  public logout(): void {


    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have successfully logged out', AlertType.Success));
  }
}
