/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactComponentElement, useEffect } from 'react';
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';
import { connect } from 'react-redux';

import { sseConnect, eventBus } from './tequila-see';
import { sseAppStateStateChanged } from './redux/actions/sse/sse';

interface Props {
    children: ReactComponentElement<any>;
    sseAppStateStateChanged: (state: AppState) => SSEResponse;
}

const mapDispatchToProps = {
    sseAppStateStateChanged,
};

const SSEListener: React.FC<Props> = (props: Props) => {
    useEffect(() => {
        sseConnect();
        eventBus.on(SSEEventType.AppStateChange, (state: AppState) => props.sseAppStateStateChanged(state));
    }, []);
    return <div>{props.children}</div>;
};

export default connect(() => ({}), mapDispatchToProps)(SSEListener);
