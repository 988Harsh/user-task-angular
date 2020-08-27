import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from '../features/users/api.service';
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as UserStateAction from '../features/users/store/users.action'
@Injectable({ providedIn: "root" })
export class AuthService {

    userState: Observable<{ isLoggedIn: boolean, isAdmin: boolean, token: string }> | Subscription;
    constructor(private cookieService: CookieService, private api: ApiService,
        private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) {
        if (this.cookieService.check("user")) {
            this.cookie = JSON.parse(this.cookieService.get("user"));
            this.store.dispatch(new UserStateAction.Login(this.cookie.token, this.cookie.hasOwnProperty('role'), true))
        }
        this.authSubject = new BehaviorSubject<any>(this.cookie ? this.cookie : null);
    }

    cookie;
    authSubject;

    getCookie() {
        return this.cookie;
    }

    login(data: any) {
        data.user.tokens = [];
        this.cookieService.set("user", JSON.stringify(data));
        this.authSubject.next(data)
    }

    logout() {
        this.cookieService.delete("user");
        this.store.dispatch(new UserStateAction.Login('', false, false));
        this.authSubject.next(null)
    }

    check() { return this.authSubject.asObservable(); }

}