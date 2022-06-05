import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminStoresRoutingModule } from './admin-stores-routing.module';

import { NewStoreComponent } from './new-store/new-store.component';
import { StoresListComponent } from './stores-list/stores-list.component';

const COMPONENTS: any[] = [StoresListComponent, NewStoreComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, AdminStoresRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class AdminStoresModule { }
