import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "./features/users/api.service";

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
    token: string;


    constructor(private usersApi: ApiService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = this.usersApi.token;
        // console.log("In interceptor", this.token);
        request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${this.token}`) });
        console.log(request);
        return next.handle(request);
    }

}