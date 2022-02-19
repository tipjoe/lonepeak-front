import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * withCredentials: true
 * is an optional parameter used by XHR requests to
 * let the server know that it's sending cookies or an Authorization header.
 * When using Laravel as an API, it requires this setting to accept requests
 * from client applications.
 *
 * This middleware saves us the trouble of adding it to every http request.
 */

// See notes in providers section of app.modules.ts to understand why
// interceptors can't be registered here with providedIn: 'root' option.
@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      withCredentials: true,
      // Headers example.
      // headers: req.headers.set('Authorization', 'doggyAuthTokenTest')
    });
    return next.handle(newReq);
  }
}
