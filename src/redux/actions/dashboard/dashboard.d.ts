/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
