import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { catchError, switchMap, filter, take, finalize, map } from 'rxjs/operators';
import { UserLoginService } from './service/user-login.service';

@Injectable()
export class AppJwtInterceptor implements HttpInterceptor {

  private jwt;

  constructor(
    private auth: UserLoginService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.auth.isLoggedIn$
      .pipe(
        switchMap((_) => {
          const cognitoUser = this.auth.cognitoUtil.getCurrentUser();
          if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
              if (session) {
                const idToken = session.getIdToken();
                if (idToken) {
                  this.jwt = idToken.getJwtToken();
                }
              }
            });

            const authenticatedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${this.jwt}`
              }
            });
            return next.handle(authenticatedRequest);
          }
          return next.handle(request);
        }),
        catchError((err) => {
          return next.handle(request);
        }),
      );
  }
}
