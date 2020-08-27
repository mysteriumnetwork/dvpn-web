import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';

interface SSEState {
    appState?: AppState;
}

function sseReducer(state: SSEState = {}, action: SSEResponse) {
    switch (action.type) {
        case SSEEventType.AppStateChange:
            return {
                ...state,
                sse: action.payload,
            };
        default:
            return state;
    }
}

export default sseReducer;
