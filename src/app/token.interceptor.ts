import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenidentificationService } from './token-identification.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenIdentification : TokenidentificationService,
    private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let header;


    if(localStorage.getItem('token') != null){

      header = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })

    }
    else {
      header = new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    }
    const requestClone = request.clone({
      headers: header
    });

    return next.handle(requestClone);
  }
}
