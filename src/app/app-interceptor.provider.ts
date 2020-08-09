import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppJwtInterceptor} from './app-jwt.interceptor';

export const AppInterceptorProviders= [
    { provide: HTTP_INTERCEPTORS, useClass: AppJwtInterceptor , multi: true },
];
