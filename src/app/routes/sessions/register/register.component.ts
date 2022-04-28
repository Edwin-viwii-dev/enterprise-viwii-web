import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  componentList: string[] = ['PROFILE', 'TABLES'];
  isSubmitting = false;

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    components: [[], [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [this.confirmValidator]],
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get components() {
    return this.registerForm.get('components');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  signUp() {
    this.isSubmitting = true;

    this.auth
      .signUp(this.username?.value, this.email?.value, this.password?.value, this.components?.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe(
        () => this.router.navigateByUrl('/'),
        (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.registerForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        }
      );
  }
}
