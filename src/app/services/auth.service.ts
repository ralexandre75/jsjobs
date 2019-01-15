import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL= "http://localhost:4201/auth"

  constructor(private _httpClient: HttpClient) { }

  login(credentials) {
    return this._httpClient.post<any>(`${this.BASE_URL}/login`, credentials)
                            .pipe(
                              map(res => res)
                            );
  }

  userIsLoggedIn(){
    return localStorage.getItem('jbbData');
  }

  logOut(){
    localStorage.removeItem('jbbData');
  }

  register(credentials){
    console.log('register', credentials);
  }
}
