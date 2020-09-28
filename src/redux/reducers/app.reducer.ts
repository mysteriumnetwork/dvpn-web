import { AUTHENTICATE, AppActionTypes, ACCEPT_TERMS, LOADING } from '../actions/app';

export interface Auth {
    authenticated: boolean,
    withDefaultCredentials: boolean
}

export interface Terms {
    acceptedAt: string | undefined,
    acceptedVersion: string | undefined
}

export interface AppState {
    loading: boolean
    auth: Auth
    terms: Terms
}

const INITIAL_STATE: AppState = {
    loading: true,
    auth: {
        authenticated: false,
        withDefaultCredentials: false,
    },
    terms: {
        acceptedAt: undefined,
        acceptedVersion: undefined,
    },
};

function appReducer(state: AppState = INITIAL_STATE, action: AppActionTypes): AppState {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                auth: { ...action.payload as Auth },
            };
        }
        case ACCEPT_TERMS: {
            return {
                ...state,
                terms: { ...action.payload as Terms },
            };
        }
        case LOADING: {
            return {
                ...state,
                loading: action.payload as boolean,
            };
        }
        default:
            return state;
    }
}

export default appReducer;
