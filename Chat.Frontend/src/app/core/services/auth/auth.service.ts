import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _tokenName = 'access_token';
  private _baseUrl = '/api/Login';

  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(this._baseUrl, { username, password })
      .pipe(tap((res) => this.setAccessToken(res.access_token)));
  }

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
