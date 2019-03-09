import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from '../../classes/alert';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../../enums/alert-type.enum';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.validateForm();
  }

  private validateForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.signupForm.valid) {
      const {
        firstName,
        lastName,
        email,
        password
      } = this.signupForm.value;

      this.subscriptions.push( this.authService.signup(firstName, lastName, email, password).subscribe( success => {
        if (success) {
          this.router.navigate(['/board']);
        } else {
          const failedDbSignUpAlert = new Alert('There was a problem signing up, please try again!', AlertType.Danger);
          this.alertService.alerts.next(failedDbSignUpAlert);
        }
        this.loadingService.isLoading.next(false);
      }));

    } else {
      const failedSignUpAlert = new Alert(
        'Please enter a valid name, email and password',
        AlertType.Danger
      );
      this.alertService.alerts.next(failedSignUpAlert);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
