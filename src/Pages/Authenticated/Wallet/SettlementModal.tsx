/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import Button from '../../../Components/Buttons/Button';
import { Fees } from 'mysterium-vpn-js';
import './SettlementModal.scss';
import { displayMyst } from '../../../commons/money.utils';
import { Fade, Modal } from '@material-ui/core';
import ConfirmationDialogue from '../../../Components/ConfirmationDialogue/ConfirmationDialogue';
import { useSnackbar } from 'notistack';

interface Props {
    open?: boolean;
    onClose?: () => void;
    onSettle?: () => void;
    fees?: Fees;
    unsettledEarnings: number;
}

const SettlementModal = ({ open = false, onClose = () => {}, fees, onSettle = () => {}, unsettledEarnings }: Props) => {
    const [confirmation, setConfirmation] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const calculateEstimatedEarnings = (): number => {
        const settlementFee = fees?.settlement || 0;
        const hermesFee = fees?.hermes || 0;
        return unsettledEarnings - settlementFee - hermesFee;
    };

    return (
        <>
            <Modal className="settlement-modal" open={open} onClose={onClose} disableBackdropClick>
                <Fade in={open}>
                    <div className="settlement-modal__block">
                        <div className="settlement-modal__title">Settlement fees</div>
                        <div className="settlement-modal__content">
                            <div className="settlement-modal__fees">
                                <div className="settlement-modal__fees-row-description">Beneficiary address:</div>
                                <div>{displayMyst(fees?.settlement)}</div>
                                <hr className="m-b-15 m-t-15" />
                                <div className="settlement-modal__fees-row-description">Amount to settle</div>
                                <div>{displayMyst(unsettledEarnings)}</div>
                                <hr className="m-b-15 m-t-15" />
                                <div className="settlement-modal__fees-row">
                                    <div className="settlement-modal__fees-row-description">Transactor fee:</div>
                                    <div>{displayMyst(fees?.settlement)}</div>
                                </div>

                                <div className="settlement-modal__fees-row">
                                    <div className="settlement-modal__fees-row-description">You will get:</div>
                                    <div>{displayMyst(calculateEstimatedEarnings())}</div>
                                </div>
                            </div>
                        </div>
                        <div className="settlement-modal__footer">
                            <Button onClick={onClose} style="gray">
                                Cancel
                            </Button>
                            <Button
                                disabled={unsettledEarnings < 1}
                                onClick={() => {
                                    setConfirmation(true);
                                }}
                                autoFocus
                            >
                                Settle
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
            <ConfirmationDialogue
                open={confirmation}
                onCancel={() => setConfirmation(false)}
                onConfirm={() => {
                    enqueueSnackbar('Settlement submitted for processing', { variant: 'success' });
                    setConfirmation(false);
                    onSettle();
                }}
            />
        </>
    );
};

export default SettlementModal;
