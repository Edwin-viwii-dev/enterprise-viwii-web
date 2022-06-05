import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { StoresService } from '@shared/services/stores.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.scss'],
})
export class NewStoreComponent implements OnInit {
  storeForm: FormGroup;
  dataStore: any = {};
  mainAlert: any = {
    show: false,
    message: '',
    color: '',
  };

  categories: any = [
    'Accesorios',
    'Arepas',
    'Artesanías',
    'Aseo',
    'Belleza',
    'Carnicerías',
    'Cacharrerías',
    'Comidas Rápidas',
    'Comida Asiática',
    'Comida Árabe',
    'Comida Italiana',
    'Comida Mexicana',
    'Droguerías',
    'Ferreterías',
    'Fruterías',
    'Joyerías',
    'Licores',
    'Librerías',
    'Mascotas',
    'Minimercados',
    'Misceláneas',
    'Panaderías',
    'Papelerías',
    'Pescaderías',
    'Picadas',
    'Piñaterías',
    'Postres',
    'Restaurantes',
    'Ropa',
    'Salsamentarías',
    'Servicios',
    'Tecnología',
    'Orgánicos',
    'Otros',
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoresService
  ) {
    this.storeForm = this.fb.group({
      storeName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      addressStore: ['', [Validators.required]],
      category: ['', [Validators.required]],
      citystore: ['', [Validators.required]],
      phoneStore: ['', [Validators.required]],
      attentionHourInit: ['', [Validators.required]],
      shopkeeperName: ['', [Validators.required]],
      attentionSchedule: [[], [Validators.required]],
      attentionHourEnd: ['', [Validators.required]],
      active: [false, [Validators.required]],
      censured: [false, [Validators.required]],
      open: [false, [Validators.required]],
      productsWithPhotos: [false, [Validators.required]],
      withSubCategories: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  confirmValidator = (control: FormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.storeForm.controls.password.value) {
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

  createNewStore() {
    console.log(this.storeForm.value)
    if (this.storeForm.valid) {
      const storeFormFiltered = this.storeForm.value;
      console.log(storeFormFiltered);
      this.storeService.createStore(storeFormFiltered).subscribe(
        () => {
          this.showAlert('Hemos creado correctamente la tienda', 'green');
        },
        (error: any) => {
          this.showAlert('Ha ocurrido un error al crear la tienda, intentalo de nuevo', 'red');
        }
      );
    } else {
      this.showAlert('Debes completar todos los campos requeridos', 'red');
    }
  }
}
