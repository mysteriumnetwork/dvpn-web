/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/styles/pages/onboarding/steps/welcome.scss';
import { ONBOARDING_TERMS } from '../../../constants/routes';

const Welcome = () => {
    return (
        <div className="step-block welcome">
            <h1 className="step-block--heading">Welcome node runner!</h1>
            <p className="step-block--heading-paragraph">Lets get you up and running. </p>
            <div className="step-block-content">
                <Link to={ONBOARDING_TERMS} className="btn btn-filled btn-center start">
                    <span className="btn-text">Start node setup</span>
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
