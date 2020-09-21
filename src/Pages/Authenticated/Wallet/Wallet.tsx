/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, Identity } from 'mysterium-vpn-js';
import { Settlement } from 'mysterium-vpn-js/src/transactor/settlement';
import { SettlementListResponse } from 'mysterium-vpn-js/lib/transactor/settlement';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@material-ui/core';

import Header from '../../../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import Table, { TableRow } from '../../../Components/Table/Table';
import LoadingButton from '../../../Components/Buttons/LoadingButton';
import { displayMyst } from '../../../commons/money.utils';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';
import { parseMessage } from '../../../commons/error.utils';

import './Wallet.scss';
import SettingsCard from './SettingsCard';
import WalletModal from './WalletModal';
import BeneficiaryChangeModal from './BeneficiaryChangeModal';

interface StateProps {
    unsettledEarnings: number;
    isBeneficiaryModalOpen: boolean;
    settlementResponse?: SettlementListResponse;
    hermesId?: string;
    pageSize: number;
    currentPage: number;
}

interface Props {
    appState?: AppState;
    identity?: Identity;
}

const mapStateToProps = (state: RootState) => ({
    appState: state.sse.appState,
    identity: state.general.currentIdentity,
});

const earnings = (appState?: AppState, identityRef?: string): number => {
    if (!identityRef || !appState?.identities) {
        return 0;
    }

    return appState.identities.filter((i) => i?.id == identityRef)[0].earnings;
};

const row = (s: Settlement): TableRow => {
    const cells = [
        {
            className: 'w-20',
            content: s.settledAt,
        },
        {
            className: 'w-30',
            content: s.beneficiary,
        },
        {
            className: 'w-30',
            content: s.txHash,
        },
        {
            className: 'w-10',
            content: '',
        },
        {
            className: 'w-10',
            content: s.amount,
        },
    ];

    return {
        key: s.txHash,
        cells: cells,
    };
};

const Wallet: FC<Props> = ({ appState, identity }) => {
    const [state, setState] = useState<StateProps>({
        unsettledEarnings: 0,
        isBeneficiaryModalOpen: false,
        pageSize: 10,
        currentPage: 1,
    });

    const [beneficiary, setBeneficiary] = useState<string>();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        Promise.all([tequilapiClient.settlementHistory({}), tequilapiClient.defaultConfig()]).then(
            ([settlementResponse, defaultConfig]) => {
                setState({
                    ...state,
                    settlementResponse: settlementResponse,
                    hermesId: defaultConfig?.data?.hermes?.hermesId,
                });
            }
        );
    }, [state.pageSize, state.currentPage]);

    useEffect(() => {
        (identity?.id ? tequilapiClient.identityBeneficiary(identity.id) : Promise.reject()).then((r) =>
            setBeneficiary(r.beneficiary)
        );
    }, [identity]);

    const settle = () => {
        if (!!identity?.id && !!state?.hermesId) {
            tequilapiClient
                .settleSync({
                    hermesId: state.hermesId,
                    providerId: identity?.id,
                })
                .catch((err) => {
                    enqueueSnackbar(parseMessage(err) || 'Settlement Failed', { variant: 'error' });
                    console.log(err);
                });
        }
    };

    const openModel = () => setState({ ...state, isBeneficiaryModalOpen: true });

    if (identity === undefined) {
        return <CircularProgress className="spinner" />;
    }

    const handlePrevPageButtonClick = () => {
        setState({ ...state, currentPage: state.currentPage - 1 });
    };

    const handleNextPageButtonClick = () => {
        setState({
            ...state,
            currentPage: state.currentPage + 1,
        });
    };

    const onPageClicked = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setState({ ...state, currentPage: pageNumber });
    };

    const { items = [], totalPages = 0 } = { ...state?.settlementResponse };

    return (
        <div className="main">
            <div className="main-block main-block--split">
                <Header logo={Logo} name="Wallet" />

                <div className="wallet__earnings">
                    <div className="earnings">
                        <p className="earnings__value">{displayMyst(earnings(appState, identity.id))}</p>
                        <p className="earnings__label">Unsettled Earnings</p>
                    </div>

                    <LoadingButton onClick={settle} className="btn btn-filled">
                        <span className="btn-text-white">Settle Now</span>
                    </LoadingButton>
                </div>

                <Table
                    headers={[
                        { name: 'Date', className: 'w-20' },
                        { name: 'Beneficiary', className: 'w-30' },
                        { name: 'Transaction ID', className: 'w-30' },
                        { name: 'Fee', className: 'w-10' },
                        { name: 'Received Amount', className: 'w-10' },
                    ]}
                    rows={(items || []).map(row)}
                    currentPage={state.currentPage}
                    lastPage={totalPages}
                    handlePrevPageButtonClick={handlePrevPageButtonClick}
                    handleNextPageButtonClick={handleNextPageButtonClick}
                    onPageClick={onPageClicked}
                />
            </div>
            <div className="sidebar-block">
                <div className="wallet-sidebar">
                    <SettingsCard
                        onEdit={openModel}
                        header="Payout Beneficiary address"
                        contentHeader={beneficiary}
                        isLoading={!beneficiary}
                        content={
                            <>
                                <div>This is where you will get paid your ETH. Don't have a wallet?</div>
                                <p className="m-t-10">
                                    <a href="#">Get it here.</a>
                                </p>
                            </>
                        }
                    />

                    <SettingsCard
                        onEdit={() => {}}
                        header="Auto settlement threshold"
                        contentHeader="1 MYST (90% of max settlement amount)"
                        isLoading={false}
                        content={
                            <>
                                <div>
                                    When unsettled earning will reach threshold node will do on-chain transaction and
                                    move funds into your beneficiary address.
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
            <BeneficiaryChangeModal
                isOpen={state.isBeneficiaryModalOpen}
                onClose={() => {
                    setState({ ...state, isBeneficiaryModalOpen: false });
                }}
                beneficiary={beneficiary}
                identityId={identity.id}
            />
            {/*<WalletModal*/}
            {/*    isOpen={state.isModalOpen}*/}
            {/*    onClose={() => {*/}
            {/*        setState({ ...state, isModalOpen: false });*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    );
};

export default connect(mapStateToProps)(Wallet);
