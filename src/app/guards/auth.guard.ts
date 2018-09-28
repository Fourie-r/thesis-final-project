import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Alert } from '../classes/alert';
import { AlertType } from '../enums/alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.currentUser.pipe(
      take(1),
      map(currentUser => !!currentUser),
      tap(loggedIn => {
        if (!loggedIn) {
          this.alertService.alerts.next(
            new Alert(
              'You must be logged in to access that page.',
              AlertType.Danger
            )
          );
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
          });
        }
      })
    );
  }
}
