/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
// @ts-ignore
import WAValidator from 'wallet-address-validator';

import { DefaultTextField } from '../../../Components/DefaultTextField';
import '../../../assets/styles/pages/onboarding/steps/payout-settings.scss';
import { DefaultSlider } from '../../../Components/DefaultSlider';
import { DEFAULT_IDENTITY_PASSPHRASE, DEFAULT_STAKE_AMOUNT } from '../../../constants/defaults';
import { tequilapiClient } from '../../../api/TequilApiClient';
import Button from '../../../Components/Buttons/Button';

interface StateInterface {
    walletAddress: string;
    stake: number;
    errors: string[];
}

const SettlementSettings = ({ callbacks }: { callbacks: OnboardingChildProps }): JSX.Element => {
    const [thisState, setValues] = useState<StateInterface>({
        walletAddress: '0x...',
        stake: DEFAULT_STAKE_AMOUNT,
        errors: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const errors = (...messages: string[]): void => {
        setValues({ ...thisState, errors: messages });
    };

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...thisState, [prop]: event.target.value });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setValues({ ...thisState, stake: newValue });
    };

    const handleDone = () => {
        if (!validateWalletAddress(thisState.walletAddress)) {
            errors('Invalid Ethereum wallet address');
            return;
        }

        setIsLoading(true);
        tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((args) => registerIdentityInTransactor(args.id))
            .then(() => callbacks.nextStep())
            .catch((error) => {
                errors('API call failed!');
                console.log(error);
                setIsLoading(false);
            });
    };

    const registerIdentityInTransactor = (identity: string): Promise<void> => {
        return tequilapiClient.identityRegister(identity, {
            beneficiary: thisState.walletAddress,
            stake: thisState.stake,
        });
    };

    const validateWalletAddress = (walletAddress: string): boolean => {
        return WAValidator.validate(walletAddress, 'eth');
    };

    return (
        <div className="step-block payout-settings">
            <h1 className="step-block--heading">Payout settings</h1>
            <p className="step-block--heading-paragraph">Fill in the following information to receive payments.</p>
            <div className="step-block-content">
                <Collapse in={thisState.errors.length > 0}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {thisState.errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </Alert>
                </Collapse>
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
                            handleChange={handlePricePerGbChanged}
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
                    <Button onClick={callbacks.nextStep}>Setup Later</Button>
                    <Button onClick={handleDone} isLoading={isLoading}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SettlementSettings;
