import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { StoresService } from '@shared/services/stores.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss']
})
export class MyStoreComponent implements OnInit {
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
    'Comidas rápidas',
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
      active: ['', [Validators.required]],
      censured: ['', [Validators.required]],
      open: ['', [Validators.required]],
      productsWithPhotos: ['', [Validators.required]],
      withSubCategories: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('storeId')) {
      this.getStore();
    }
  }

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

  getStore() {
    const storeId = this.router.url.split('?storeId=')[1];
    this.storeService.getStoreDetail(storeId).subscribe(
      result => {
        this.dataStore = result;
        console.log(this.dataStore);
        this.storeForm.patchValue(this.dataStore);
      },
      (error: any) => {
        this.showAlert('Ha ocurrido un error al traer el usuario, intentalo de nuevo', 'red');
      }
    );
  }

  updateStore() {
    const storeId = this.router.url.split('?storeId=')[1];
    const storeFormFiltered = this.storeForm.value;
    this.storeService.updateStore(storeId, storeFormFiltered).subscribe(
      result => {
        this.dataStore = result;
        this.storeForm.patchValue(this.dataStore);
      },
      error => {
        this.showAlert('Ha ocurrido un error al actualizar la tienda, intentalo de nuevo', 'red');
      }
    );
  }

}
