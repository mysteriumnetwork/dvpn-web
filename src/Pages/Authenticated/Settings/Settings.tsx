/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import Header from '../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';

const Settings = () => {
    return (
        <div className="settings wrapper">
            <div className="settings--content">
                <Header logo={Logo} name="Settings" />
            </div>
        </div>
    );
};

export default Settings;
