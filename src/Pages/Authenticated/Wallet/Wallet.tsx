/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, Fees, Identity } from 'mysterium-vpn-js';
import { Settlement } from 'mysterium-vpn-js/src/transactor/settlement';
import { SettlementListResponse } from 'mysterium-vpn-js/lib/transactor/settlement';
import { CircularProgress } from '@material-ui/core';

import Header from '../../../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import Table, { TableRow } from '../../../Components/Table/Table';
import { displayMyst } from '../../../commons/money.utils';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';

import './Wallet.scss';
import Button from '../../../Components/Buttons/Button';
import SettlementModal from './SettlementModal';
import { parseError } from '../../../commons/error.utils';
import { useSnackbar } from 'notistack';
import { etherscanTxUrl, hermesId } from '../../../commons/config';
import { date2human } from '../../../commons/date.utils';
import SettingsCard from './SettingsCard';
import { currentIdentity } from '../../../redux/app.slice';
import { beneficiary } from '../../../redux/sse.slice';

interface StateProps {
    unsettledEarnings: number;
    isBeneficiaryModalOpen: boolean;
    settlementResponse?: SettlementListResponse;
    pageSize: number;
    currentPage: number;
}

interface SettlementState {
    loading: boolean;
    dialogueOpen: boolean;
    fees?: Fees;
}

interface Props {
    appState?: AppState;
    identity?: Identity;
    hermesId?: string;
    etherscanTxUrl: string;
    beneficiary: string;
}

const mapStateToProps = (state: RootState) => ({
    appState: state.sse.appState,
    identity: currentIdentity(state.app.currentIdentityRef, state.sse.appState?.identities),
    etherscanTxUrl: etherscanTxUrl(state.app.config),
    hermesId: hermesId(state.app.config),
    beneficiary: beneficiary(state.sse),
});

const earnings = (appState?: AppState, identityRef?: string): number => {
    if (!identityRef || !appState?.identities) {
        return 0;
    }

    return appState.identities.filter((i) => i?.id === identityRef)[0].earnings;
};

const row = (s: Settlement, etherscanTxUrl: string): TableRow => {
    const cells = [
        {
            className: 'w-20',
            content: date2human(s.settledAt),
        },
        {
            className: 'w-40',
            content: s.beneficiary,
        },
        {
            className: 'w-10',
            content: <a href={`${etherscanTxUrl}/${s.txHash}`}>{s.txHash.substr(s.txHash.length - 8)}</a>,
        },
        {
            className: 'w-15',
            // @ts-ignore
            content: displayMyst(s.fees),
        },
        {
            className: 'w-15',
            // @ts-ignore
            content: displayMyst(s.amount as number),
        },
    ];

    return {
        key: s.txHash,
        cells: cells,
    };
};

const Wallet = ({ appState, identity, hermesId, etherscanTxUrl, beneficiary }: Props) => {
    const [state, setState] = useState<StateProps>({
        unsettledEarnings: 0,
        isBeneficiaryModalOpen: false,
        pageSize: 10,
        currentPage: 1,
    });
    const [settlementState, setSettlementState] = useState<SettlementState>({
        loading: false,
        dialogueOpen: false,
    });

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        tequilapiClient
            .settlementHistory({ pageSize: state.pageSize, page: state.currentPage })
            .then((settlementResponse) => {
                setState({
                    ...state,
                    settlementResponse: settlementResponse,
                });
            });
    }, [state.pageSize, state.currentPage]);

    if (!identity || !hermesId) {
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
    const earning = earnings(appState, identity.id);
    return (
        <div className="main">
            <div className="main-block main-block--split">
                <Header logo={Logo} name="Wallet" />

                <div className="wallet__earnings">
                    <div className="earnings">
                        <p className="earnings__value">{displayMyst(earning)}</p>
                        <p className="earnings__label">Unsettled Earnings</p>
                    </div>
                    <div>
                        <Button
                            className="wallet-settle-button"
                            isLoading={settlementState.loading}
                            onClick={() => {
                                Promise.all([setSettlementState({ ...settlementState, loading: true })])
                                    .then(() => tequilapiClient.transactorFees())
                                    .then((fees) => {
                                        setSettlementState({
                                            ...settlementState,
                                            dialogueOpen: true,
                                            loading: false,
                                            fees: fees,
                                        });
                                    })
                                    .catch((err) => {
                                        enqueueSnackbar('Error: ' + parseError(err), { variant: 'error' });
                                        setSettlementState({ ...settlementState, loading: false });
                                    });
                            }}
                        >
                            Settle Now
                        </Button>
                    </div>
                </div>

                <Table
                    headers={[
                        { name: 'Date', className: 'w-20' },
                        { name: 'Beneficiary', className: 'w-40' },
                        { name: 'Transaction ID', className: 'w-10' },
                        { name: 'Fee', className: 'w-15' },
                        { name: 'Received Amount', className: 'w-15' },
                    ]}
                    rows={(items || []).map((i) => row(i, etherscanTxUrl))}
                    currentPage={state.currentPage}
                    lastPage={totalPages}
                    handlePrevPageButtonClick={handlePrevPageButtonClick}
                    handleNextPageButtonClick={handleNextPageButtonClick}
                    onPageClick={onPageClicked}
                />
            </div>

            <SettlementModal
                unsettledEarnings={identity.earnings}
                fees={settlementState.fees}
                open={settlementState.dialogueOpen}
                onClose={() => {
                    setSettlementState({ ...settlementState, dialogueOpen: false });
                }}
                onSettle={() => {
                    setSettlementState({ ...settlementState, dialogueOpen: false });
                    tequilapiClient.settleAsync({ providerId: identity.id, hermesId: hermesId });
                }}
            />

            <div className="sidebar-block">
                <div className="wallet-sidebar">
                    <SettingsCard
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
        </div>
    );
};

export default connect(mapStateToProps)(Wallet);
