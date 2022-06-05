import { NgModule } from '@angular/core';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { NewInventoryComponent } from './new-inventory/new-inventory.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { SharedModule } from '@shared/shared.module';
import { AdminInventoryRoutingModule } from './admin-inventory-routing.module';


const COMPONENTS: any[] = [InventoryListComponent, NewInventoryComponent, EditInventoryComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, AdminInventoryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class AdminInventoryModule { }
