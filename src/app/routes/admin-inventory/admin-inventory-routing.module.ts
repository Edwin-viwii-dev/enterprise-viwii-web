import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { NewInventoryComponent } from './new-inventory/new-inventory.component';

const routes: Routes = [
  { path: 'inventory-list', component: InventoryListComponent },
  { path: 'new-inventory', component: NewInventoryComponent },
  { path: 'edit-inventory', component: EditInventoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInventoryRoutingModule { }
