import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { supabase } from '../../../supabase';
import { Token, User } from './interface';
import { Menu } from '@core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(protected http: HttpClient) {}

  login(email: string, password: string, rememberMe = false) {
    return new Observable<Token>((subscriber: any) => {
      supabase.auth.signIn({ email, password }).then((result: any) => {
        console.log(result);
        if(result.error) subscriber.error(result.error)
        else subscriber.next(result.session);
      });
    });
  }

  signUp(email: string, password: string, data:any) {
    console.log(email, password, data);
    return new Observable<Token>((subscriber: any) => {
      supabase.auth.signUp({ email, password }, { data }).then((result: any) => {
        if(result.error) subscriber.error(result.error)
        else subscriber.next(result.session);
      });
    });
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return new Observable<any>((subscriber: any) => {
      supabase.auth.signOut();
      subscriber.next({});
    });
  }

  me() {
    return new Observable<User>((subscriber: any) => {
      const user = supabase.auth.user();
      console.log(user)
      subscriber.next(user);
    });
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
