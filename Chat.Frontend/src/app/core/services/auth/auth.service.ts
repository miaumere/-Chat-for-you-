import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _tokenName = 'access_token';
  private _baseUrl = '/api/Login';

  private _userSubject$ = new BehaviorSubject<User | null>(null);
  user$ = this._userSubject$.asObservable();

  constructor(private http: HttpClient) {}

  login(request: ILoginRequest): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(this._baseUrl, request)
      .pipe(
        tap((res: { token: string; user: User }) => {
          console.log('res: ', res);
          this.setAccessToken(res.token);
        })
      );
  }

  setUser(user: User) {
    this._userSubject$.next(user);
  }

  register(username: string, password: string) {}

  setAccessToken(token: string): void {
    localStorage.setItem(this._tokenName, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this._tokenName);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem(this._tokenName);
  }
}
