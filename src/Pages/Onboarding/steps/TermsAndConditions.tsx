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

import { acceptWithTermsAndConditions } from '../../../api/TequilAPIWrapper';
import Button from '../../../Components/Buttons/Button';
import "./TermsAndConditions.scss"

const md = new showdown.Converter();

const TermsAndConditions = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const agree = () => {
        acceptWithTermsAndConditions().then(() => callbacks.nextStep());
    };

    const termsHtml = md.makeHtml(TermsEndUser);
    return (
        <div className="step">
            <h1 className="step__title m-b-30">Terms & Conditions</h1>
            <div className="step__content">
                <div className="terms-and-conditions">
                    {ReactHtmlParser(termsHtml)}
                </div>
                <div className="step__content-buttons step__content-buttons--center m-t-50">
                    <Button
                        onClick={() => {
                            agree();
                        }}
                    >
                        I accept
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
