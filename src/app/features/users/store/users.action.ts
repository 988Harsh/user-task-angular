import { Action, createFeatureSelector, State } from "@ngrx/store";

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';
export const LOG_OUT = 'LOG_OUT';





export class Login implements Action {
    readonly type = LOG_IN;
    constructor(public token: string, public isAdmin: boolean) {

    }
}

export class Logout implements Action {
    readonly type = LOG_OUT;
}

export class LoginStart implements Action {
    readonly type = LOG_IN_START;
    constructor(public credentials: { email: string, password: string }) { }
}

export class LoginFail implements Action {
    readonly type = LOG_IN_FAIL;
    constructor(public err: string) { }
}



export type UsersState = Login | Logout | LoginStart | LoginFail;
