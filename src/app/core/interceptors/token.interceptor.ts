import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authService.getLoggedInUserInfo();

    // If user logged in then add 'username' field in every request as Authorization header
    if (user) {
      request = request.clone({
        headers: request.headers.set('Authorization', user['username'])
      });
    }

    return next.handle(request);
  }
}
