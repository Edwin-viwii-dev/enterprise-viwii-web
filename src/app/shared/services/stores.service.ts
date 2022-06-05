import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabase } from 'supabase';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  constructor() {}

  getStoresList() {
    return new Observable(subscriber => {
      supabase
        .from('stores')
        .select('*')
        .then(result => {
          if (result.data) subscriber.next(result.data);
          if (result.error) subscriber.error(result.error);
          subscriber.complete()
        });
    });
  }

  getStoreDetail(storeId: string) {
    return new Observable(subscriber => {
      supabase
        .from('stores')
        .select('*')
        .eq('id', storeId)
        .then(result => {
          if (result.data) subscriber.next(result.data[0]);
          if (result.error) subscriber.error(result.error);
          subscriber.complete()
        });
    });
  }

  createStore(dataStore: any) {
    return new Observable(subscriber => {
      supabase
        .from('stores')
        .insert(dataStore)
        .then(resultTable => {
          console.log(resultTable);
          if (resultTable.data) subscriber.next(resultTable.data);
          if (resultTable.error) subscriber.error(resultTable.error);
          subscriber.complete()
        });
    });
  }

  updateStore(storeId: string, storeData: any) {
    return new Observable(subscriber => {
      supabase
        .from('stores')
        .update(storeData)
        .eq('id', storeId)
        .then(resultTable => {
          if (resultTable.data) subscriber.next(resultTable.data);
          if (resultTable.error) subscriber.error(resultTable.error);
          subscriber.complete()
        });
    });
  }
}
