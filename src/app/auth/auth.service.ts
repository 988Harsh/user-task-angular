import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { ApiService } from '../features/users/api.service';

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(private cookieService: CookieService, private api: ApiService) {

        if (this.cookieService.check("user"))
            this.cookie = JSON.parse(this.cookieService.get("user"));
        this.authSubject = new BehaviorSubject<any>(this.cookie ? this.cookie : null);
    }

    isLoggedIn = false;
    isAdmin = false;
    cookie;
    authSubject;

    getCookie() {
        return this.cookie;
    }

    login(data: any) {
        this.cookieService.set("user", JSON.stringify(data));
        if (data.user.role) this.isAdmin = true;
        this.isLoggedIn = true;
        this.authSubject.next(data)
    }

    logout() {
        this.cookieService.delete("user");
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.authSubject.next(null)
    }

    check() { return this.authSubject.asObservable(); }

}