import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { inject } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next,) => {
  const storage = inject(BrowserStorageService);
  let token = storage.get('token');

  const router = inject(Router)
  if (token) {
    req = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}`),
    });
  }
  
  return next(req).pipe(
    catchError((error: any) => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401 || error.status === 403){
          if(router.url === '/'){}
          else{
            router.navigate(['/']);
            storage.clear();
          }
        }
      }
      return throwError(() => error);
    })
  )
};
