import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.validateForm();
   }

   private validateForm() {
     this.signupForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       userName: ['', [Validators.required]],
       firstName: ['', [Validators.required]],
       lastName: ['', [Validators.required]]
     });
   }


   submit() {
     const {email, password, userName, firstName, lastName} = this.signupForm.value;
     console.log(`First name: ${firstName}, Last name: ${lastName}, Email: ${email}, password: ${password}, userName: ${userName}`);
   }

  ngOnInit() {
  }

}
