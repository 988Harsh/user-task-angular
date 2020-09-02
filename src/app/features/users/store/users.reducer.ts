import { Action, createSelector, createFeatureSelector } from "@ngrx/store";
import * as UserStateAction from "./users.action";

export interface State {
    isLoggedIn: boolean;
    isAdmin: boolean;
    token: string;
    authError: string;
}

export const selectFeature = (state: State) => state.token;

export const doSomething = createSelector(
    selectFeature,
    (token) => "Bearer " + token
);



const initialState: State = {
    isLoggedIn: false,
    isAdmin: false,
    token: '',
    authError: null
}

doSomething(initialState);


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