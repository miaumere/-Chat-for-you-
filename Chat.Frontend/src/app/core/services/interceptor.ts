import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  constructor(
    private _loaderService: LoaderService,
    private _toastrService: ToastrService
  ) {}

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
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._toastrService.error(
          error.status !== 500 ? error.error : '',
          '⚠️ An error has occured!'
        );

        return throwError(error);
      }),
      finalize(() => {
        this._loaderService.hide();
      })
    );
  }
}
