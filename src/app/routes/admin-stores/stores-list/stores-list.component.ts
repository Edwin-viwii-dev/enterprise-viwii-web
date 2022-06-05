import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { StoresService } from '@shared/services/stores.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss'],
})
export class StoresListComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Nombre tienda', field: 'storeName' },
    { header: 'Estado', field: 'active' },
    { header: 'Categoria', field: 'category' },
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
            this.router.navigate(['my-store'], { queryParams: { storeId: record.id } });
          },
        },
        {
          type: 'icon',
          text: 'Borrar',
          icon: 'delete',
          tooltip: 'Borrar',
          color: 'warn',
          pop: true,
          popTitle: 'Eliminar tienda?',
          popDescription: '¿Realmente deseas eliminar la tienda?',
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

  list: any = [];

  constructor(private storesService: StoresService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.storesService.getStoresList().subscribe(
      result => {
        console.log(result);
        this.list = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.list.filter = filterValue.trim().toLowerCase();

    // if (this.list.paginator) {
    //   this.list.paginator.firstPage();
    // }
  }
}
