/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useLayoutEffect } from 'react';
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';
import { connect } from 'react-redux';

import ServerSentEvents from './sse/server-sent-events';
import { sseAppStateStateChanged } from './redux/actions/sse';

interface Props {
    sseAppStateStateChanged: (state: AppState) => SSEResponse;
}

const mapDispatchToProps = {
    sseAppStateStateChanged,
};

const ServerSentEventsSubscriber = ({ sseAppStateStateChanged }: Props): null => {
    const sse = new ServerSentEvents();

    useLayoutEffect((): void => {
        sse.connect();
        sse.on(SSEEventType.AppStateChange, (state: AppState) => sseAppStateStateChanged(state));
    }, []);
    return null;
};

export default connect(null, mapDispatchToProps)(ServerSentEventsSubscriber);
