import { Action } from "@ngrx/store";
import * as UserStateAction from "./users.action";

export interface State {
    isLoggedIn: boolean;
    isAdmin: boolean;
    token: string;
    authError: string;
}

const initialState: State = {
    isLoggedIn: false,
    isAdmin: false,
    token: '',
    authError: null
}

export function userStateReducer(state = initialState, action: UserStateAction.UsersState) {

    switch (action.type) {
        case UserStateAction.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                isAdmin: action.isAdmin,
                authError: null
            }
        case UserStateAction.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                token: '',
                authError: null
            }
        case UserStateAction.LOG_IN_START:
            return {
                ...state,
                authError: null
            }
        case UserStateAction.LOG_IN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                isAdmin: false,
                token: '',
                authError: action.err
            }
        default:
            return state;
    }
}