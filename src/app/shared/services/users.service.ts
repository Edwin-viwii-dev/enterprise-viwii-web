import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supabase } from '../../../supabase';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUsersList() {
    return new Observable(subscriber => {
      supabase
        .from('users')
        .select('*')
        .then(result => {
          if (result.data) subscriber.next(result.data);
          if (result.error) subscriber.error(result.error);
          subscriber.complete()
        });
    });
  }

  getUserDetail(userId: string) {
    return new Observable(subscriber => {
      supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .then(result => {
          if (result.data) subscriber.next(result.data[0]);
          if (result.error) subscriber.error(result.error);
          subscriber.complete()
        });
    });
  }

  createUser(email: string, password: string, user_metadata: any) {
    return new Observable(subscriber => {
      supabase.auth.api.createUser({ email, password, user_metadata}).then((result: any) => {
        if (result.user) {
          const dataToTableUsers = result.user.user_metadata;
          dataToTableUsers.id = result.user.id;
          dataToTableUsers.email = result.user.email;
          this.createUserInTable
          (dataToTableUsers)
        }
        if (result.error) subscriber.error(result.error);
        subscriber.complete()
      });
    });
  }

  createUserInTable(userToTable:any){
    return new Observable(subscriber=>{
      supabase
      .from('users')
      .insert(userToTable)
      .then(resultTable => {
        console.log(resultTable)
        if (resultTable.data) subscriber.next(resultTable.data);
        if (resultTable.error) subscriber.error(resultTable.error);
        subscriber.complete()
      });
    })
  }

  updateUser(userId:string, userData:any){
    return new Observable(subscriber => {
      supabase.auth.api.updateUserById(userId, {user_metadata: userData}).then(result=>{
        if (result.user) {
          supabase.from('users').update(userData).eq('id', userId).then(resultTable=>{
            if (resultTable.data) subscriber.next(result);
            if (resultTable.error) subscriber.error(resultTable.error);
          })
        }
        if (result.error) subscriber.error(result.error);
        subscriber.complete()
      })
    })
  }
}
