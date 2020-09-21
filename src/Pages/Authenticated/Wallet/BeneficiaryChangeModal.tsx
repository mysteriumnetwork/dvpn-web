/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { Fade, Modal } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import './WalletModel.scss';

import Button from '../../../Components/Buttons/Button';
import { DefaultTextField } from '../../../Components/DefaultTextField';
import { tequilapiClient } from '../../../api/TequilApiClient';
import { parseMessage } from '../../../commons/error.utils';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    identityId: string;
    beneficiary?: string;
}

interface State {
    beneficiary: string;
}

const BeneficiaryChangeModal: FC<Props> = ({ isOpen, onClose, beneficiary, identityId }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState<State>({
        beneficiary: '',
    });
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setState({ ...state, beneficiary: beneficiary || '' });
    }, [beneficiary]);

    const handleTextFieldsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const updateBeneficiary = () => {
        setIsLoading(true);
        tequilapiClient
            .updateIdentityPayout(identityId, state.beneficiary)
            .then(() => {
                enqueueSnackbar('Beneficiary address changed', { variant: 'success' });
                onClose();
            })
            .catch((err) => {
                const msg = parseMessage(err);
                enqueueSnackbar(msg || 'Beneficiary update failed', { variant: 'error' });
                console.log(err);
            })
            .finally(() => setIsLoading(false));
    };

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
                    <div className="title">Update beneficiary address</div>
                    <div className="settings">
                        <DefaultTextField
                            handleChange={handleTextFieldsChange}
                            value={state.beneficiary}
                            defaultValue={{}}
                            stateName="beneficiary"
                        />
                    </div>
                    <div className="buttons-block">
                        <Button
                            onClick={() => {
                                onClose();
                            }}
                            className="button btn close"
                        >
                            Close
                        </Button>
                        <Button
                            onClick={updateBeneficiary}
                            isLoading={isLoading}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default BeneficiaryChangeModal;
