import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { InventoryService } from '@shared/services/inventory.service';
import { StoresService } from '@shared/services/stores.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Nombre producto', field: 'productName' },
    { header: 'Precio', field: 'price' },
    { header: 'Categoria', field: 'productCategory' },
    { header: 'Tienda', field: 'dataStore.storeName' },
    {
      header: 'Operación',
      field: 'operation',
      width: '160px',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Editar',
          icon: 'edit',
          tooltip: 'Editar',
          click: record => {
            this.router.navigate(['admin-inventory/edit-inventory'], {
              queryParams: { productId: record.id },
            });
          },
        },
        {
          type: 'icon',
          text: 'Borrar',
          icon: 'delete',
          tooltip: 'Borrar',
          color: 'warn',
          pop: true,
          popTitle: 'Eliminar producto?',
          popDescription: '¿Realmente deseas eliminar el producto?',
          popCloseText: 'Cancelar',
          popOkText: 'Eliminar',
          popOkColor: 'warn',
          click: () => {
            alert('delete');
          },
        },
      ],
    },
  ];

  inventoryList: any = [];
  storesList: any = [];
  inventoryWithStores: any = [];

  constructor(
    private inventoryService: InventoryService,
    private storesService: StoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInventoryList();
  }

  getInventoryList() {
    this.inventoryService.getInventoryList().subscribe(
      result => {
        console.log(result);
        this.inventoryList = result;
      },
      error => {
        console.log(error);
      },
      () => {
        this.getStoresList();
      }
    );
  }

  getStoresList() {
    this.storesService.getStoresList().subscribe(
      result => {
        console.log(result);
        this.storesList = result;
      },
      error => {
        console.log(error);
      },
      () => {
        this.matchStoresInProducts();
      }
    );
  }

  matchStoresInProducts() {
    this.inventoryList.forEach((product: any) => {
      this.storesList.forEach((store: any) => {
        if (product.storeId == store.id) product.dataStore = store;
      });
    });
    this.inventoryWithStores = this.inventoryList
    console.log(this.inventoryWithStores)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const textModified = filterValue.trim().toLowerCase();
    console.log(textModified)
  }
}
