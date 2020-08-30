/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
// @ts-ignore
import { TermsEndUser } from '@mysteriumnetwork/terms';

import { acceptWithTermsAndConditions } from '../../../api/TequilaApiCalls';
import '../../../assets/styles/pages/onboarding/steps/terms-and-condions.scss';

const md = new showdown.Converter();

const TermsAndConditions = (props: OnboardingChildProps) => {
    const agree = () => {
        acceptWithTermsAndConditions().then(() => props.nextCallback());
    };

    const termsHtml = md.makeHtml(TermsEndUser);
    return (
        <div className="step-block term-and-conditions">
            <h1 className="step-block--heading">Terms & Conditions</h1>
            <div className="step-block-content">
                <div className="terms-and-conditions">{ReactHtmlParser(termsHtml)}</div>
                <div
                    onClick={() => {
                        agree();
                    }}
                    className="btn btn-filled btn-center accept"
                >
                    <span className="btn-text">I accept</span>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
