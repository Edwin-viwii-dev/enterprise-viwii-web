import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
  { path: 'users-list', component: UsersListComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'edit-user', component: EditUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminUsersRoutingModule {}
