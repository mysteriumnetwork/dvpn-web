/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';

import '../../../assets/styles/pages/onboarding/steps/welcome.scss';
import Button from '../../../Components/Buttons/Button';

const Welcome: FC<{ callbacks: OnboardingChildProps }> = ({ callbacks }) => {
    return (
        <div className="step-block welcome">
            <h1 className="step-block--heading">Welcome node runner!</h1>
            <p className="step-block--heading-paragraph">Lets get you up and running. </p>
            <div className="step-block-content">
                <Button onClick={callbacks.nextStep}>
                    Start node setup
                </Button>
            </div>
        </div>
    );
};

export default Welcome;
