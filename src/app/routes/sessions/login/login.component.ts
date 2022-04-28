import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  errorText:string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  login() {
    this.isSubmitting = true;

    this.auth
      .login(this.email?.value, this.password?.value, this.rememberMe?.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe(
        () => this.router.navigateByUrl('/'),
        errorRes => {
          const form = this.loginForm;
          if (errorRes.status === 400) {
            form.get('email')?.setErrors({ remote: 'Email invalid' });
            form.get('password')?.setErrors({ remote: 'Password invalid' });

            if(errorRes.message.includes('not confirmed')) {
              this.errorText = 'Debes confirmar el correo electrónico.'
            }
          }
          this.isSubmitting = false;
        }
      );
  }
}
