/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, Identity } from 'mysterium-vpn-js';
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

interface StateProps {
    unsettledEarnings: number;
    isBeneficiaryModalOpen: boolean;
    settlementResponse?: SettlementListResponse;
    pageSize: number;
    currentPage: number;
}

interface Props {
    appState?: AppState;
    identity?: Identity;
}

const mapStateToProps = (state: RootState) => ({
    appState: state.sse.appState,
    identity: state.app.currentIdentity,
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

const Wallet = ({ appState, identity }: Props) => {
    const [state, setState] = useState<StateProps>({
        unsettledEarnings: 0,
        isBeneficiaryModalOpen: false,
        pageSize: 10,
        currentPage: 1,
    });

    useEffect(() => {
        tequilapiClient.settlementHistory({}).then((settlementResponse) => {
            setState({
                ...state,
                settlementResponse: settlementResponse,
            });
        });
    }, [state.pageSize, state.currentPage]);

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
            <div className="main-block">
                <Header logo={Logo} name="Wallet" />

                <div className="wallet__earnings">
                    <div className="earnings">
                        <p className="earnings__value">{displayMyst(earnings(appState, identity.id))}</p>
                        <p className="earnings__label">Unsettled Earnings</p>
                    </div>
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
        </div>
    );
};

export default connect(mapStateToProps)(Wallet);
