import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthReponse } from '../interfaces/response-auth.interface';
import { User } from '../interfaces/user.interface';

const URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public _authStatus: string = 'checking';
  public _user: User | null = null;
  public _token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  get authStatus(): string {
    if (this._authStatus === 'checking') {
      return 'checking';
    }

    if (this._user) {
      return 'authenticated';
    }

    this._authStatus = 'not-authenticated';

    return this._authStatus;
  }

  login(email: string, password: string) {
    return this.http
      .post(`${URL}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp as AuthReponse)),
        catchError((error) => this.handleAuthError(error))
      );
  }

  register(data: { fullName: string; email: string; password: string }) {
    return this.http.post(`${URL}/auth/register`, data);
  }

  logout() {
    this._authStatus = 'not-authenticated';
    this._user = null;
    this._token = null;
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ user, token }: AuthReponse) {
    this._authStatus = 'authenticated';
    this._user = user;
    this._token = token;

    localStorage.setItem('token', token);

    return this._user;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
