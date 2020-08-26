import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> | UrlTree {
        // const isAuth = this.authService.isLoggedIn;
        // if (isAuth) {
        //     return true;
        // }
        // else {
        //     return this.router.navigate(['/auth']);
        // }

        return this.authService.check().pipe(map(data => {
            if (data)
                return true;
        }, tap(isAuth => {
            if (isAuth !== true)
                return this.router.navigate(['/auth']);
        })))
    }
}