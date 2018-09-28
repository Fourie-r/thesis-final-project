import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../classes/alert';
import { AlertType } from '../../enums/alert-type.enum';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService,
    private loadingService: LoadingService) {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(): void {

    this.loadingService.isLoading.next(true);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log(`Email: ${email}, password: ${password}`);
      this.loadingService.isLoading.next(false);

    } else {
      const failedLoginAlert = new Alert(
        'Your email and password combination was incorrect, please try again',
        AlertType.Danger
      );
      this.alertService.alerts.next(failedLoginAlert);
    }
  }
}
