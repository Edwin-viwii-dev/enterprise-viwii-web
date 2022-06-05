import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabase } from 'supabase';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getInventoryList() {
    return new Observable(subscriber => {
      supabase
        .from('products')
        .select('*')
        .then(result => {
          if (result.data) subscriber.next(result.data);
          if (result.error) subscriber.error(result.error);
          subscriber.complete()
        });
    });
  }
}
