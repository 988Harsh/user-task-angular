import { Action } from "@ngrx/store";

export const LOG_IN = 'LOG_IN';

export class Login implements Action {
    readonly type = LOG_IN;
    constructor(public token: string, public isAdmin: boolean, public isLoggedIn: boolean) {

    }
}
