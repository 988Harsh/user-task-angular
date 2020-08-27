import { Action } from "@ngrx/store";
import * as UserStateAction from "./users.action";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    token: ''
}

export function userStateReducer(state = initialState, action: UserStateAction.Login) {

    switch (action.type) {
        case UserStateAction.LOG_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                token: action.token,
                isAdmin: action.isAdmin
            }
        default:
            return state;
    }
}