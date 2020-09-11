/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactComponentElement, useLayoutEffect } from 'react';
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';
import { connect } from 'react-redux';

import { sseConnect, eventBus } from './tequila-see';
import { sseAppStateStateChanged } from './redux/actions/sse';

interface Props {
    children: ReactComponentElement<any>;
    sseAppStateStateChanged: (state: AppState) => SSEResponse;
}

const mapDispatchToProps = {
    sseAppStateStateChanged,
};

const SSEListener: React.FC<Props> = ({ sseAppStateStateChanged, children }) => {
    useLayoutEffect((): void => {
        sseConnect();
        eventBus.on(SSEEventType.AppStateChange, (state: AppState) => sseAppStateStateChanged(state));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return children;
};

export default connect(() => ({}), mapDispatchToProps)(SSEListener);
