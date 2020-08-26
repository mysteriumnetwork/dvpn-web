export interface DashboardState {
    sessions: {
        loading: boolean;
        sessions: Session[];
    };
}

export interface DashboardAction<T> extends Action {
    type: string;
    payload: T;
}

export type DashboardTypes = DashboardAction;
