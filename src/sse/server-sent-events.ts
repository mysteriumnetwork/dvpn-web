/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { EventEmitter } from 'events';

import { AppState, parseSSEResponse, SSEEventType, TEQUILAPI_SSE_URL } from 'mysterium-vpn-js';

class ServerSentEvents {
    emitter: EventEmitter;
    eventSource?: EventSource;

    constructor() {
        this.emitter = new EventEmitter();
    }

    connect() {
        const url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi/events/state`;
        this.eventSource = new EventSource(url);
        this.eventSource.onerror = (evt): void => {
            console.log('[sse error]', evt);
        };
        this.eventSource.onmessage = (evt): void => {
            const { type, payload } = parseSSEResponse(evt.data);

            this.emitter.emit(type, payload);
        };
        return this;
    }

    on(channel: string, callback: any) {
        this.emitter.on(channel, callback);
    }
}

const ConnectToSSE = (dispatcher: (state: any) => void) => {
    const sse = new ServerSentEvents();
    sse.connect();
    sse.on(SSEEventType.AppStateChange, (state: any) => dispatcher(state));
};

export default ConnectToSSE;
