import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresListComponent } from './stores-list/stores-list.component';
import { NewStoreComponent } from './new-store/new-store.component';

const routes: Routes = [
  { path: 'stores-list', component: StoresListComponent },
  { path: 'new-store', component: NewStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStoresRoutingModule {}
