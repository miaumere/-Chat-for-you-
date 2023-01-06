import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  constructor(private _loaderService: LoaderService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._loaderService.show();

    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      httpRequest = httpRequest.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
    }
    return next.handle(httpRequest).pipe(
      finalize(() => {
        this._loaderService.hide();
      })
    );
  }
}
