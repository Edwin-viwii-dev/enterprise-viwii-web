import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash'
import { UsersService } from '@shared/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  componentList: string[] = ['PROFILE', 'ADMIN-STORES', 'ADMIN-USERS', 'MY-STORE', 'ADMIN-INVENTORY', 'ADMIN-SALES'];
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
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    roles: ['', [Validators.required]],
    cellphone: ['', [Validators.required]],
    permissions: [[], [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [this.confirmValidator]],
  });

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private userService: UsersService) {}

  ngOnInit() {}

  signUp() {
    this.isSubmitting = true;
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    const userFormFiltered = _.omit(this.registerForm.value, ['confirmPassword', 'email', 'password'])
    this.auth
      .signUp(email, password, userFormFiltered)
      .pipe(filter(authenticated => authenticated))
      .subscribe(
        () => {
          //this.userService.createUser()
          this.router.navigateByUrl('/')
        },
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
