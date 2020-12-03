/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import CopyToClipboard from '../../../../Components/CopyToClipboard/CopyToClipboard';
import { DefaultTextField } from '../../../../Components/DefaultTextField';
import Button from '../../../../Components/Buttons/Button';
import { useSnackbar } from 'notistack';
import { tequilapiClient } from '../../../../api/TequilApiClient';

interface Props {
    beneficiary?: string;
    providerId?: string;
    hermesId?: string;
    canSettle: boolean;
}

interface State {
    beneficiary: string;
}

const PayoutAddress = ({ beneficiary, providerId, hermesId, canSettle }: Props) => {
    const [state, setState] = useState<State>({
        beneficiary: beneficiary || '',
    });
    //0x1479922a0f314b0f7a805f7503df65d2419dc64a
    const { enqueueSnackbar } = useSnackbar();
    const saveDisabled = !providerId || !hermesId || !beneficiary;
    return (
        <>
            <div className="input-group">
                <div className="flex-row">
                    <div className="input-group__label">Beneficiary wallet address</div>
                    <CopyToClipboard text={beneficiary || ''} />
                </div>

                <DefaultTextField
                    stateName="beneficiary"
                    handleChange={() => (e: React.ChangeEvent<HTMLInputElement>) => {
                        setState({ ...state, beneficiary: e.target.value });
                    }}
                    value={state?.beneficiary}
                />
            </div>
            <div className="footer__buttons m-t-40">
                {canSettle && (
                    <Button
                        onClick={() => {
                            tequilapiClient.settleWithBeneficiary({
                                providerId: providerId || '',
                                hermesId: hermesId || '',
                                beneficiary: state.beneficiary || '',
                            });
                            enqueueSnackbar('Settlement with beneficiary change submitted!', { variant: 'success' });
                        }}
                        disabled={saveDisabled}
                    >
                        Save
                    </Button>
                )}
            </div>
        </>
    );
};

export default PayoutAddress;
