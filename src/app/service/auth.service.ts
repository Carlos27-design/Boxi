import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/api';

export interface RegisterUserDto {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${URL}/auth/login`, data);
  }

  register(data: { fullName: string; email: string; password: string }) {
    return this.http.post(`${URL}/auth/register`, data);
  }
}
