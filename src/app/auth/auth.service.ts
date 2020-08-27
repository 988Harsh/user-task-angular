import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from '../features/users/api.service';
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as UserStateAction from '../features/users/store/users.action'
import * as UserReducer from '../features/users/store/users.reducer'
@Injectable({ providedIn: "root" })
export class AuthService {
    cookie;
    userState: Observable<{ isLoggedIn: boolean, isAdmin: boolean, token: string }> | Subscription;
    constructor(private cookieService: CookieService, private api: ApiService,
        private store: Store<{ userState: UserReducer.State }>) {
        if (this.cookieService.check("user")) {
            // this.store.dispatch(new UserStateAction.AutoLogin());
            this.cookie = JSON.parse(this.cookieService.get("user"));
            this.store.dispatch(new UserStateAction.Login(this.cookie.token, this.cookie.hasOwnProperty('role')))
        }
        // this.authSubject = new BehaviorSubject<any>(this.cookie ? this.cookie : null);
    }



}