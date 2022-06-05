import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { UsersService } from '@shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Email', field: 'email' },
    { header: 'Nombre', field: 'username' },
    { header: 'Rol', field: 'role' },
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
            this.router.navigate(['admin-users/new-user'], { queryParams: { userId: record.id } });
          },
        },
        {
          type: 'icon',
          text: 'Borrar',
          icon: 'delete',
          tooltip: 'Borrar',
          color: 'warn',
          pop: true,
          popTitle: 'Eliminar usuario?',
          popDescription: '¿Realmente deseas eliminar el usuario?',
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

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.userService.getUsersList().subscribe(
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
