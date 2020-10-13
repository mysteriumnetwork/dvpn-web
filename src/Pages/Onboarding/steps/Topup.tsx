/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { QRCode } from 'react-qr-svg';
import Button from '../../../Components/Buttons/Button';
import { displayMyst } from '../../../commons/money.utils';

interface Props {
    callbacks: OnboardingChildProps;
    channelAddress: string;
    transferAmount: number;
}

const Topup = ({ callbacks, channelAddress, transferAmount }: Props) => {
    return (
        <div className="step">
            <h1 className="step__title">Topup</h1>
            <p className="step__description">
                To activate your account, transfer {displayMyst(transferAmount)} to your wallet (Görli Testnet
                blockchain)
            </p>
            <div className="step__content m-t-20">
                <div className="qr-code">
                    <QRCode value={channelAddress} />
                </div>
                <p className="step__description">
                    Do not send any other cryptocurrency to this address! Only MYST tokens are accepted.
                </p>
                <div className="step__content-buttons step__content-buttons--center m-t-50">
                    <Button onClick={callbacks.nextStep} isLoading={false}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Topup;
