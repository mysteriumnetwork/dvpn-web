/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useState } from 'react';
import { Fade, Modal } from '@material-ui/core';

import './WalletModel.scss';

import { DefaultSlider } from '../../../Components/DefaultSlider';
import Button from '../../../Components/Buttons/Button';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface StateProps {
    stake: number;
}

const WalletModal: FC<Props> = ({ onClose, isOpen }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState<StateProps>({
        stake: 30,
    });

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
                    <div className="title">Update stake goal</div>
                    <div className="settings">
                        <div className="settings--slider">
                            <p>Price per minute</p>
                            <DefaultSlider
                                value={state.stake}
                                handleChange={(e, v) => {
                                    setState({ ...state, stake: v });
                                }}
                                step={1}
                                min={12}
                                max={100}
                                disabled={false}
                            />
                            <div className="bottom-line">
                                <p>12 MYST</p>
                                <p>100 MYST</p>
                            </div>
                        </div>
                        <p className="bottom-text">
                            Stake goal should be between min and max values. If current stake will be less than stake
                            goal, 10% of each settlement amount will be used to increaase stake.
                        </p>
                    </div>
                    <div className="buttons-block">
                        <Button onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={isLoading}>
                            Save
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default WalletModal;
