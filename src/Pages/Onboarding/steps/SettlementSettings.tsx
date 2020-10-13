/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ChangeEvent, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

import { DefaultTextField } from '../../../Components/DefaultTextField';
import Slider from '../../../Components/Slider/Slider';
import { DEFAULT_IDENTITY_PASSPHRASE, DEFAULT_STAKE_AMOUNT } from '../../../constants/defaults';
import { tequilapiClient } from '../../../api/TequilApiClient';
import Button from '../../../Components/Buttons/Button';
import { parseError } from '../../../commons/error.utils';
import { DECIMAL_PART, IdentityRegisterRequest } from 'mysterium-vpn-js';
import { isValidEthereumAddress } from '../../../commons/ethereum.utils';
import { DefaultCheckbox } from '../../../Components/Checkbox/DefaultCheckbox';

interface Props {
    callbacks: OnboardingChildProps;
    onSetStake: (stake: number) => void;
}

interface StateInterface {
    walletAddress: string;
    stake: number;
    errors: string[];
    hasReferralCode: boolean;
    referralCode: string;
}

const SettlementSettings = ({ callbacks, onSetStake }: Props): JSX.Element => {
    const [state, setState] = useState<StateInterface>({
        walletAddress: '',
        stake: DEFAULT_STAKE_AMOUNT,
        errors: [],
        hasReferralCode: false,
        referralCode: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const errors = (...messages: string[]): void => {
        setState({ ...state, errors: messages });
    };

    const handleTextFieldsChange = (prop: keyof StateInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleStakeChanged = (event: any, newValue: number) => {
        setState({ ...state, stake: newValue });
        onSetStake(newValue);
    };

    const handleDone = () => {
        if (state.walletAddress && !isValidEthereumAddress(state.walletAddress)) {
            errors('Invalid Ethereum wallet address');
            return;
        }
        setIsLoading(true);

        tequilapiClient
            .identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
            .then((args) => registerIdentityInTransactor(args.id))
            .then(() => callbacks.nextStep())
            .catch((error) => {
                errors(parseError(error) || 'API call failed');
                console.log(error);
                setIsLoading(false);
            });
    };

    const registerIdentityInTransactor = (identity: string): Promise<void> => {
        const req: IdentityRegisterRequest = {
            beneficiary: state.walletAddress,
            stake: state.stake * DECIMAL_PART,
        };

        if (state.hasReferralCode) {
            req.token = state.referralCode;
            req.stake = 20 * DECIMAL_PART;
        }

        return tequilapiClient.identityRegister(identity, req);
    };

    return (
        <div className="step">
            <h1 className="step__title">Payout settings</h1>
            <p className="step__description">Fill in the following information to receive payments.</p>
            <div className="step__content m-t-20">
                <Collapse in={state.errors.length > 0}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {state.errors.map((err, idx) => (
                            <div key={idx}>{err}</div>
                        ))}
                    </Alert>
                </Collapse>
                <div className="input-group">
                    <p className="input-group__label">Ethereum wallet address</p>
                    <DefaultTextField
                        handleChange={handleTextFieldsChange}
                        value={state.walletAddress}
                        placeholder={'0x...'}
                        stateName="walletAddress"
                    />
                    <p className="input-group__help">Fill in the following information to receive payments.</p>
                </div>
                <div className="input-group m-t-50">
                    <p className="input-group__label m-b-15">Set your stake amount</p>
                    <Slider
                        label="Stake amount"
                        disabled={state.hasReferralCode}
                        value={state.stake}
                        handleChange={handleStakeChanged}
                        step={1}
                        min={0}
                        max={50}
                        myst={true}
                    />
                    <p className="input-group__help">
                        To start providing services and ensure smooth and secure payouts (settlements) in Mysterium
                        Network, node runners should stake a small amount of tokens. If you choose the default option,
                        the initial stake amount will be set to 0 and it will be automatically increased up to 10 MYST
                        by taking 10% of earnings during each promise settlement (payout).
                    </p>
                </div>
                <div className="settlement-referral-block">
                    <div className="input-group m-t-50 m-b-20">
                        <DefaultCheckbox
                            label="I have referral code"
                            checked={state.hasReferralCode}
                            handleCheckboxChange={() => {
                                setState({ ...state, hasReferralCode: !state.hasReferralCode });
                            }}
                        />
                    </div>
                    {state.hasReferralCode && (
                        <div className="input-group">
                            <DefaultTextField
                                handleChange={handleTextFieldsChange}
                                placeholder="Referral code"
                                value={state.referralCode}
                                stateName="referralCode"
                            />
                            <p className="input-group__help">Enter your referral code.</p>
                        </div>
                    )}
                </div>
                <div className="step__content-buttons step__content-buttons--center">
                    <Button onClick={handleDone} isLoading={isLoading}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SettlementSettings;
