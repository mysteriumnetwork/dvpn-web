import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';

export const sseAppStateStateChanged = (state: AppState): SSEResponse => {
    return {
        type: SSEEventType.AppStateChange,
        payload: state,
    };
};
