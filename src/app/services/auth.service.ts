import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL= "http://localhost:4201/auth"
  TOKEN_NAME = 'jbb-token';
  decodedToken = null;

  constructor(private _httpClient: HttpClient) { }

  login(credentials) {
    return this._httpClient.post<any>(`${this.BASE_URL}/login`, credentials)
                            .pipe(
                              map(res => res)
                            );
  }

  userIsLoggedIn(){
    return !!localStorage.getItem('jbbData');
    return localStorage.getItem(this.TOKEN_NAME);
  }

  logOut(){
    localStorage.removeItem('jbbData');
    //localStorage.removeItem(this.TOKEN_NAME);
  }

  register(credentials){
    //console.log('register', credentials);
    return this._httpClient.post<any>(`${this.BASE_URL}/register`, credentials)
                            .pipe(
                              map(res => res)
                            );
  }

  decodeToken(token){
    return jwtDecode(token);
  }
}
