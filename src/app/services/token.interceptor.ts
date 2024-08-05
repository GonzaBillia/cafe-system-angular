import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
  }
  return next.handle(req).pipe(
    catchError((error: any) => {
      if(error instanceof HttpErrorResponse){
        console.log(error.url)
        if(error.status === 401 || error.status === 403){
          if(this.router.url === '/'){}
          else{
            localStorage.clear();
            this.router.navigate(['/']);
          }
        }
      }
      return throwError(() => error);
    })
  )
  }
}
