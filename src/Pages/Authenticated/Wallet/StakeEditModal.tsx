/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { CircularProgress, Fade, Mark, Modal, Slider as MUISlider } from '@material-ui/core';

import './WalletModel.scss';

import Button from '../../../Components/Buttons/Button';
import { Fees, Identity } from 'mysterium-vpn-js';
import { displayMyst } from '../../../commons/money.utils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    identity: Identity;
    fees?: Fees;
    onIncreaseStake: () => Promise<any>;
    onDecreaseStake: (amount: number) => Promise<any>;
}

interface State {
    initialStake: number;
    selectedStake: number;
    loading: boolean;
}

const marks = (stake: number): Mark[] => {
    return [
        {
            value: 0,
            label: '0',
        },
        {
            value: stake,
            label: `${stake}`,
        },
    ];
};

const StakeEditModal = ({ isOpen, onClose, identity, fees, onIncreaseStake, onDecreaseStake }: Props): JSX.Element => {
    const { earnings, stake } = identity;

    const [state, setState] = useState<State>({
        initialStake: stake,
        selectedStake: stake,
        loading: false,
    });

    const increaseBy = (): number => {
        return earnings - (fees?.settlement || 0);
    };

    const decreaseEnabled = (): boolean => {
        return state.initialStake > state.selectedStake;
    };

    const increaseEnabled = (): boolean => {
        return increaseBy() > 0;
    };

    const calcMarks = marks(stake);

    return (
        <Modal
            className="wallet-modal"
            open={isOpen}
            onClose={onClose}
            closeAfterTransition
            disableAutoFocus={true}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className="wallet-modal--block">
                    <div className="title">Edit Stake</div>
                    <div className="settings">
                        {fees === undefined ? (
                            <CircularProgress className="spinner" />
                        ) : (
                            <div className="settings--slider">
                                {stake > 0 ? (
                                    <MUISlider
                                        marks={calcMarks}
                                        value={state.selectedStake}
                                        disabled={false}
                                        onChange={(e, v) => {
                                            setState({ ...state, selectedStake: v as number });
                                        }}
                                        valueLabelDisplay="on"
                                        max={state.initialStake}
                                    />
                                ) : (
                                    <div>You have no stake - you can increase it.</div>
                                )}
                                <hr className="m-t-5 m-b-5" />
                                <div>Estimated increase: {displayMyst(increaseBy())}</div>
                            </div>
                        )}
                    </div>
                    <div className="buttons-block">
                        <Button
                            onClick={() => {
                                Promise.all([setState({ ...state, loading: true })])
                                    .then(() => onDecreaseStake(state.selectedStake))
                                    .then(() => onClose())
                                    .catch(() => setState({ ...state, loading: false }))
                                    .finally(() => setState({ ...state, loading: false }));
                            }}
                            extraStyle="outline-primary"
                            disabled={!decreaseEnabled()}
                        >
                            Decrease
                        </Button>
                        <div className="m-r-5" />
                        <Button
                            onClick={() => {
                                Promise.all([setState({ ...state, loading: true })])
                                    .then(() => onIncreaseStake())
                                    .then(() => onClose())
                                    .catch(() => setState({ ...state, loading: false }))
                                    .finally(() => setState({ ...state, loading: false }));
                            }}
                            disabled={!increaseEnabled()}
                        >
                            Increase
                        </Button>
                        <div className="flex-grow" />
                        <Button onClick={onClose} extraStyle="outline">
                            Close
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default StakeEditModal;
