/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js';
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

interface Data {
    identity?: Identity;
}

const PayoutSettings = (props: OnboardingChildProps) => {
    const [thisState, setValues] = React.useState<StateInterface>({
        walletAddress: '0x...',
        stake: DEFAULT_STAKE_AMOUNT,
    });

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...thisState, [prop]: event.target.value });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setValues({ ...thisState, stake: newValue });
    };

    const handleDone = () => {
        const data: Data = {};
        tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((identityRef) => tequilapiClient.identity(identityRef.id))
            .then((identity) => {
                data.identity = identity;
                return tequilapiClient.transactorFees();
            })
            .then((txFeeResp) => registerIdentityInTransactor(txFeeResp, data.identity))
            .then(() => props.nextCallback())
            .catch((error) => {
                console.error(error);
            });
    };

    const registerIdentityInTransactor = (txFeeResp: TransactorFeesResponse, identity?: Identity): Promise<void> => {
        if (identity === undefined) {
            throw 'Identity is missing!';
        }
        if (identity.registrationStatus == IdentityRegistrationStatus.Unregistered) {
            return tequilapiClient.identityRegister(identity.id, {
                beneficiary: thisState.walletAddress,
                stake: thisState.stake,
                fee: txFeeResp.registration,
            });
        } else {
            return tequilapiClient.updateIdentityPayout(identity.id, thisState.walletAddress);
        }
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
                        value={thisState.walletAddress}
                        stateName="walletAddress"
                    />
                    <p className="text-field-label bottom">Fill in the following information to receive payments.</p>
                </div>
                <div className="wallet-stake-block">
                    <p className="wallet-stack-info-p top">Set your stake amount, MYSTT</p>
                    <div className="slider-block">
                        <p>Stake amount</p>
                        <DefaultSlider
                            value={thisState.stake}
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
