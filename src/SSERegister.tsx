/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useLayoutEffect } from 'react';
import { AppState, SSEEventType, SSEResponse } from 'mysterium-vpn-js';
import { connect } from 'react-redux';

import { sseConnect, eventBus } from './tequila-see';
import { sseAppStateStateChanged } from './redux/actions/sse';

interface Props {
    sseAppStateStateChanged: (state: AppState) => SSEResponse;
}

const mapDispatchToProps = {
    sseAppStateStateChanged,
};

const SSERegister: React.FC<Props> = ({ sseAppStateStateChanged }) => {
    useLayoutEffect((): void => {
        sseConnect();
        eventBus.on(SSEEventType.AppStateChange, (state: AppState) => sseAppStateStateChanged(state));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
};

export default connect(() => ({}), mapDispatchToProps)(SSERegister);
