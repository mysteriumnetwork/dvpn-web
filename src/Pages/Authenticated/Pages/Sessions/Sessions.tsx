/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import Header from '../../Components/Header';
import { ReactComponent as Logo } from '../../../../assets/images/authenticated/pages/sessions/logo.svg';

const Sessions = () => {
    return (
        <div className="sessions wrapper">
            <div className="sessions--content">
                <Header logo={Logo} name="Sessions" />
            </div>
        </div>
    );
};

export default Sessions;
