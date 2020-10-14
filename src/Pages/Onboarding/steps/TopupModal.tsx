/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { QRCode } from 'react-qr-svg';
import Button from '../../../Components/Buttons/Button';
import { displayMyst } from '../../../commons/money.utils';
import { tequilapiClient } from '../../../api/TequilApiClient';
import { Fees, Identity } from 'mysterium-vpn-js';
import { CircularProgress, Fade, Modal } from '@material-ui/core';
import './TopupModal.scss';
import CopyToClipboard from '../../../Components/CopyToClipboard/CopyToClipboard';

interface Props {
    onTopup: () => void;
    onClose: () => void;
    beneficiary: string;
    stake: number;
    fees: Fees;
    identity: Identity;
    open: boolean;
}

const TopupModal = ({ fees, identity, stake, beneficiary, onTopup, open, onClose }: Props) => {
    const registrationFee = () => {
        return fees?.registration || 0;
    };

    useEffect(() => {
        if (identity.balance >= registrationFee() + stake) {
            tequilapiClient
                .identityRegister(identity.id, {
                    beneficiary,
                    stake,
                })
                .then(() => onTopup());
        }
    }, [identity, open]);

    return (
        <Modal
            open={open}
            className="topup-modal"
            disableBackdropClick
            disableAutoFocus={true}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className="topup-modal__block">
                    <p className="topup-modal__description">
                        To activate your account, transfer{' '}
                        <span className="topup-modal__highlighted">{displayMyst(registrationFee() + stake)}</span> to
                        your wallet on (Görli Testnet blockchain)
                    </p>
                    <div className="topup-modal__address">
                        {identity.channelAddress}
                        <CopyToClipboard text={identity.channelAddress} />
                    </div>
                    <div className="m-t-20">
                        <div className="topup-modal__content">
                            <div className="topup-modal__balance">
                                <p className="topup-modal__balance__label">Your current balance</p>
                                <p className="topup-modal__balance__value">{displayMyst(identity.balance)}</p>
                            </div>
                            <div className="topup-modal__qr">
                                <QRCode value={identity.channelAddress} />
                            </div>
                        </div>
                        <p className="topup-modal__description m-t-20">
                            Do not send any other cryptocurrency to this address! Only MYST tokens are accepted.
                        </p>
                        <div className="topup-modal__footer m-t-20">
                            <Button onClick={onClose}>Back</Button>
                            <div className="flex-grow" />
                            <div className="topup-modal__blockchain">
                                <p>Waiting for transfer</p>
                                <small>Automatically scanning blockchain...</small>
                            </div>
                            <CircularProgress className="m-l-20" disableShrink />
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default TopupModal;
