import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    userState: Subscription;
    constructor(private authService: AuthService, private router: Router,
        private store: Store<{ userState: { isLoggedIn: boolean, isAdmin: boolean, token: string } }>) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | UrlTree {

        return this.store.select('userState').pipe(map(data => {
            return data.isLoggedIn;
        }, tap(isLoggedIn => {
            if (isLoggedIn !== true)
                return this.router.navigate(['/auth']);
        })));

    }
}