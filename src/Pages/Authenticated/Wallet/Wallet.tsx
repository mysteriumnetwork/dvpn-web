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
import { Config } from 'mysterium-vpn-js/lib/config/config';
import _ from 'lodash';
import { etherscanTxUrl } from '../../../commons/config';
import { date2human } from '../../../commons/date.utils';

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
}

const mapStateToProps = (state: RootState) => ({
    appState: state.sse.appState,
    identity: state.app.currentIdentity,
    etherscanTxUrl: etherscanTxUrl(state.app.config),
    hermesId: _.get<Config, any>(state.app.config, 'data.hermes.hermes-id'),
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
            className: 'w-30',
            content: s.beneficiary,
        },
        {
            className: 'w-10',
            content: <a href={`${etherscanTxUrl}/${s.txHash}`}>{s.txHash.substr(s.txHash.length - 8)}</a>,
        },
        {
            className: 'w-20',
            // @ts-ignore
            content: displayMyst(s.fees),
        },
        {
            className: 'w-20',
            // @ts-ignore
            content: displayMyst(s.amount as number),
        },
    ];

    return {
        key: s.txHash,
        cells: cells,
    };
};

const Wallet = ({ appState, identity, hermesId, etherscanTxUrl }: Props) => {
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
            <div className="main-block">
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
                        { name: 'Beneficiary', className: 'w-30' },
                        { name: 'Transaction ID', className: 'w-10' },
                        { name: 'Fee', className: 'w-20' },
                        { name: 'Received Amount', className: 'w-20' },
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
        </div>
    );
};

export default connect(mapStateToProps)(Wallet);
