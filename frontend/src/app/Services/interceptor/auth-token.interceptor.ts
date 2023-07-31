import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request's body is an instance of FormData
    // const isFormDataRequest = request.body instanceof FormData;

    // Set the initial headers
    const newHeaders: { [header: string]: string | string[] } = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    // If it's a FormData request, add the 'Content-Type' header
    // if (isFormDataRequest) {
    //   console.log('request to add Content-Type')
    //   newHeaders['Content-Type'] = 'multipart/form-data';
    // }

    // Clone the request with the updated headers
    const modifiedRequest = request.clone({
      setHeaders: newHeaders
    });

    return next.handle(modifiedRequest);
  }
}