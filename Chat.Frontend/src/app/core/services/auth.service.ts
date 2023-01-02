import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getUserFromJWT } from '../utils/get-user-from-jwt.function';
import { ILoginRequest } from './models/login-request.model';
import { UserDto } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _baseUrl = '/api/Login';

  public user$ = new BehaviorSubject<UserDto | null>(null);

  constructor(private http: HttpClient, private _router: Router) {
    this.user$.next(getUserFromJWT());
  }

  login(request: ILoginRequest): Observable<string> {
    return this.http
      .post(this._baseUrl, request, {
        responseType: 'text',
      })
      .pipe(
        tap((token: any) => {
          localStorage.setItem('authToken', token);
          this.user$.next(getUserFromJWT());
        })
      );
  }

  register(request: ILoginRequest): Observable<string> {
    return this.http
      .post(`${this._baseUrl}/register`, request, {
        responseType: 'text',
      })
      .pipe(
        tap((token: string) => {
          localStorage.setItem('authToken', token);
          this.user$.next(getUserFromJWT());
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.user$.next(null);
    this._router.navigate(['./login']);
  }
}
