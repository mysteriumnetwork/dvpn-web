/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/styles/pages/onboarding/steps/backup.scss';
import { ONBOARDING_HOME, ONBOARDING_PAYOUT_SETTINGS } from '../../../constants/routes';

const Backup = () => {
    return (
        <div className="step-block backup">
            <h1 className="step-block--heading">Backup your keys</h1>
            <p className="step-block--heading-paragraph">
                To make sure you don’t lose your earnings, you should store your identity’s private key file somewhere
                safe. Read more about backup
            </p>
            <div className="step-block-content">
                <Link to={ONBOARDING_PAYOUT_SETTINGS} className="btn btn-empty skip">
                    <span className="btn-text">Skip</span>
                </Link>
                <Link to={ONBOARDING_HOME} className="btn btn-filled download">
                    <span className="btn-text">Download private key</span>
                </Link>
            </div>
        </div>
    );
};

export default Backup;
