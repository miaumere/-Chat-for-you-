import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _baseUrl = '/api/Login';

  public user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(request: ILoginRequest): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(this._baseUrl, request)
      .pipe(
        tap((res: { token: string; user: User }) => {
          this.user$.next(res.user);
        })
      );
  }

  register(request: ILoginRequest) {
    return this.http
      .post<{ token: string; user: User }>(
        `${this._baseUrl}/registrate`,
        request
      )
      .pipe(
        tap((res: { token: string; user: User }) => {
          this.user$.next(res.user);
        })
      );
  }

  logout(): void {
    this.user$.next(null);
  }
}
