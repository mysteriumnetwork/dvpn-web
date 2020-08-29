/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Identity } from 'mysterium-vpn-js';
import { TransactorFeesResponse } from 'mysterium-vpn-js/lib/payment/fees';

import { DefaultTextField } from '../../Components/DefaultTextField';
import '../../assets/styles/pages/onboarding/steps/payout-settings.scss';
import { DefaultSlider } from '../../Components/DefaultSlider';
import { DEFAULT_IDENTITY_PASSPHRASE, DEFAULT_STAKE_AMOUNT } from '../../Services/constants';
import { tequilapiClient } from '../../api/TequilApiClient';

interface StateInterface {
    walletAddress: string;
    stake: number;
}

interface PayoutSettingsProps extends OnboardingChildProps {
    identity?: Identity[];
}

const PayoutSettings = (props: PayoutSettingsProps) => {
    const [values, setValues] = React.useState<StateInterface>({
        walletAddress: '0x...',
        stake: DEFAULT_STAKE_AMOUNT,
    });

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setValues({ ...values, stake: newValue });
    };
    const handleDone = () => {
        tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then(() => tequilapiClient.transactorFees())
            .then((txFeeResp) => handleGetTransactionFeesResponse(txFeeResp, 'TODO pass unregisered identity'))
            .then(() => props.nextCallback())
            .catch((error) => {
                console.error(error);
            });
    };

    const handleGetTransactionFeesResponse = (txFeeResp: TransactorFeesResponse, id: string): Promise<void> => {
        return tequilapiClient.identityRegister(id, {
            beneficiary: values.walletAddress,
            stake: values.stake,
            fee: txFeeResp.registration,
        });
    };

    return (
        <div className="step-block payout-settings">
            <h1 className="step-block--heading">Payout settings</h1>
            <p className="step-block--heading-paragraph">Fill in the following information to receive payments.</p>
            <div className="step-block-content">
                <div className="wallet-input-block">
                    <p className="text-field-label top">Ethereum wallet address</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        value={values.walletAddress}
                        stateName="walletAddress"
                    />
                    <p className="text-field-label bottom">Fill in the following information to receive payments.</p>
                </div>
                <div className="wallet-stake-block">
                    <p className="wallet-stack-info-p top">Set your stake amount, MYSTT</p>
                    <div className="slider-block">
                        <p>Stake amount</p>
                        <DefaultSlider
                            value={values.stake}
                            handleChange={() => handlePricePerGbChanged}
                            step={1}
                            min={0}
                            max={50}
                            mystSlider={true}
                        />
                    </div>
                    <p className="wallet-stack-info-p bottom">
                        In terms to start providing services and ensure smoth and secure payouts (settlements) in
                        Mysterium Network, node runners should stake small amounts of tokens. If you choose default
                        option, initial stake will be 0 and will be increased until minimal amount of 10MYST by taking
                        10% during each promise settlement (payout).{' '}
                    </p>
                </div>
                <div className="buttons-block">
                    <div onClick={props.nextCallback} className="btn btn-empty skip">
                        <span className="btn-text">Setup later</span>
                    </div>
                    <div onClick={handleDone} className="btn btn-filled done">
                        <span className="btn-text">Next</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayoutSettings;
