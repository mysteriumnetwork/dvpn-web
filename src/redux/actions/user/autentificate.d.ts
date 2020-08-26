export interface AutentificateState {
    autentificated: boolean;
}

export interface AutentificateAction<T> extends Action {
    type: string;
    payload: T;
}

export type AutentificateTypes = AutentificateAction;
