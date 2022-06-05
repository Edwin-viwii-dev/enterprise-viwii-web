import { Component, OnInit } from '@angular/core';
import { UsersService } from '@shared/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  titleComponent: string = 'Nuevo usuario';
  userForm: FormGroup;
  isNewUser: boolean = true;
  dataUser: any = {};
  mainAlert: any = {
    show: false,
    message: '',
    color: '',
  };
  allPermissions: any = [
    { id: 'ADMIN-USERS', name: 'Usuarios' },
    { id: 'ADMIN-STORES', name: 'Tiendas' },
    { id: 'MY-STORE', name: 'Mi tienda' },
    { id: 'ADMIN-INVENTORY', name: 'Inventario' },
  ];

  constructor(private router: Router, private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      permissions: [[], [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('userId')) {
      this.titleComponent = 'Editar usuario';
      this.isNewUser = false;
      this.getUser();
    }
  }

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.userForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  showAlert(message: string, color: string) {
    this.mainAlert = { show: true, message, color };
    setTimeout(() => {
      this.mainAlert = { show: false, message, color };
    }, 3000);
  }

  createNewUser() {
    if (this.userForm.valid) {
      const email = this.userForm.value['email'];
      const password = this.userForm.value['password'];
      const userFormFiltered = _.omit(this.userForm.value, [
        'email',
        'password',
        'confirmPassword',
      ]);
      userFormFiltered.cellphone = userFormFiltered.cellphone.toString();
      userFormFiltered.documentNumber = userFormFiltered.documentNumber.toString();
      console.log(userFormFiltered);
      this.usersService.createUser(email, password, userFormFiltered).subscribe(
        () => {
          this.showAlert('Hemos creado correctamente el usuario', 'green');
        },
        (error: any) => {
          this.showAlert('Ha ocurrido un error al crear el usuario, intentalo de nuevo', 'red');
        }
      );
    } else {
      this.showAlert('Debes completar todos los campos requeridos', 'red');
    }
  }

  getUser() {
    const userId = this.router.url.split('?userId=')[1];
    this.usersService.getUserDetail(userId).subscribe(
      result => {
        this.dataUser = result;
        this.userForm.patchValue(this.dataUser)
      },
      (error: any) => {
        this.showAlert('Ha ocurrido un error al traer el usuario, intentalo de nuevo', 'red');
      }
    );
  }

  updateUser(){
    const userId = this.router.url.split('?userId=')[1];
    const userFormFiltered = _.omit(this.userForm.value, [
      'password',
      'confirmPassword',
    ]);
    console.log(userId, userFormFiltered)
    this.usersService.updateUser(userId, userFormFiltered).subscribe(
      result=>{
        this.dataUser = result;
        this.userForm.patchValue(this.dataUser)
      },
      (error)=>{
        this.showAlert('Ha ocurrido un error al actualizar el usuario, intentalo de nuevo', 'red');
      }
    )
  }
}
