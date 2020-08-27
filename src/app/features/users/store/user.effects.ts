import { Actions, ofType, Effect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import * as UserActions from './users.action'
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment.prod";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from "ngx-cookie-service";



@Injectable()
export class UserEffects {


    constructor(private actions: Actions, private http: HttpClient, private router: Router, private authService: AuthService, private cookieService: CookieService) { }

    @Effect()
    authLogin = this.actions.pipe(
        ofType(UserActions.LOG_IN_START),
        switchMap((credentialsData: UserActions.LoginStart) => {
            const server = environment.server;
            return this.http.post(`${server}users/login`,
                {
                    email: credentialsData.credentials.email,
                    password: credentialsData.credentials.password
                }).pipe(map((data: any) => {
                    // console.log("pipe ", data);
                    // this.authService.login(data);
                    data.user.tokens = [];
                    this.cookieService.set("user", JSON.stringify(data));
                    return new UserActions.Login(data.token, data.user.hasOwnProperty('role'))
                }), catchError((error: any) => {
                    return of(error.error);
                }));
        })
    )

    @Effect({ dispatch: false })
    authSuccess = this.actions.pipe(ofType(UserActions.LOG_IN),
        tap(() => {
            this.router.navigate(['/'])
        })
    );

    @Effect({ dispatch: false })
    logout = this.actions.pipe(ofType(UserActions.LOG_OUT),
        tap(() => {
            this.cookieService.delete("user");
        })
    )


}