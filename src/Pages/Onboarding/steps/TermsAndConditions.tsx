/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
// @ts-ignore
import { TermsEndUser } from '@mysteriumnetwork/terms';

import { acceptWithTermsAndConditions } from '../../../api/TequilAPIWrapper';
import '../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss';
import Button from '../../../Components/Buttons/Button';

const md = new showdown.Converter();

const TermsAndConditions: FC<{ callbacks: OnboardingChildProps }> = ({ callbacks }) => {
    const agree = () => {
        acceptWithTermsAndConditions().then(() => callbacks.nextStep());
    };

    const termsHtml = md.makeHtml(TermsEndUser);
    return (
        <div className="step-block term-and-conditions">
            <h1 className="step-block--heading">Terms & Conditions</h1>
            <div className="step-block-content">
                <div className="terms-and-conditions">{ReactHtmlParser(termsHtml)}</div>
                <Button
                    onClick={() => {
                        agree();
                    }}
                >
                    I accept
                </Button>
            </div>
        </div>
    );
};

export default TermsAndConditions;
