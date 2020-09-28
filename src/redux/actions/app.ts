import { Action } from 'redux';
import { Auth, Terms } from '../reducers/app.reducer';

export const AUTHENTICATE = 'AUTHENTICATE';
export const ACCEPT_TERMS = 'ACCEPT_TERMS';
export const LOADING = 'LOADING';

export interface AppAction<T> extends Action {
    type: string;
    payload: T;
}

export type AppActionTypes = AppAction<Auth> | AppAction<Terms> | AppAction<boolean>

export const authenticate = (auth: Auth): AppAction<Auth> => {
    return {
        type: AUTHENTICATE,
        payload: auth,
    };
};

export const acceptTerms = (terms: Terms): AppAction<Terms> => {
    return {
        type: ACCEPT_TERMS,
        payload: terms,
    };
};

export const loading = (loading: boolean): AppAction<boolean> => {
    return {
        type: LOADING,
        payload: loading,
    };
};
