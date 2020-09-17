/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, Identity, Session } from 'mysterium-vpn-js';
import { Settlement } from 'mysterium-vpn-js/src/transactor/settlement';
import { SettlementListResponse } from 'mysterium-vpn-js/lib/transactor/settlement';

import Header from '../../../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import Table, { TableRow } from '../../../Components/Table/Table';
import LoadingButton from '../../../Components/Buttons/LoadingButton';
import { displayMyst } from '../../../commons/money.utils';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';

import './Wallet.scss';
import SettingsCard from './SettingsCard';
import WalletModal from './WalletModal';

interface StateProps {
    unsettledEarnings: number;
    isModalOpen: boolean;
    settlementResponse?: SettlementListResponse;
    hermesId?: string;
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
            content: s.settledAt
        },
        {
            className: 'w-30',
            content: s.beneficiary
        },
        {
            className: 'w-30',
            content: s.txHash
        },
        {
            className: 'w-10',
            content: ''
        },
        {
            className: 'w-10',
            content: s.amount
        }
    ]

    return {
        key: s.txHash,
        cells: cells
    }
};

const Wallet: FC<Props> = ({ appState, identity }) => {
    const [state, setState] = useState<StateProps>({
        unsettledEarnings: 0,
        isModalOpen: false,
    });

    const [beneficiary, setBeneficiary] = useState<string>();

    useEffect(() => {
        Promise.all([tequilapiClient.settlementHistory({}), tequilapiClient.defaultConfig()]).then(
            ([settlementResponse, defaultConfig]) =>
                setState({
                    ...state,
                    settlementResponse: settlementResponse,
                    hermesId: defaultConfig?.data?.hermes['hermes-id'],
                })
        );
    }, []);

    useEffect(() => {
        (identity?.id ? tequilapiClient.identityBeneficiary(identity.id) : Promise.reject()).then((r) =>
            setBeneficiary(r.beneficiary)
        );
    }, [identity]);

    const isSettlementPossible = (): boolean => {
        return !!identity?.id && !!state?.hermesId && identity?.earnings > 0;
    };

    const settle = () => {
        if (!!identity?.id && !!state?.hermesId && identity?.earnings > 0) {
            tequilapiClient.settleSync({
                hermesId: state.hermesId,
                providerId: identity?.id,
            });
        }
    };

    const openModel = () => setState({ ...state, isModalOpen: true });
    return (
        <div className="main">
            <div className="main-block main-block--split">
                <Header logo={Logo} name="Wallet" />

                <div className="wallet__earnings">
                    <div className="earnings">
                        <p className="earnings__value">{displayMyst(earnings(appState, identity?.id))}</p>
                        <p className="earnings__label">Unsettled Earnings</p>
                    </div>

                    <LoadingButton disabled={!isSettlementPossible()} onClick={settle} className="btn btn-filled">
                        <span className="btn-text-white">Settle Now</span>
                    </LoadingButton>
                </div>

                <Table
                    headers={[
                        { name: 'Date', className:'w-20'},
                        { name: 'Beneficiary', className:'w-30'},
                        { name: 'Transaction ID', className:'w-30'},
                        { name: 'Fee', className:'w-10'},
                        { name: 'Received Amount', className:'w-10'},
                    ]}
                    rows={(state.settlementResponse?.items || []).map(row)}
                    currentPage={1}
                    lastPage={10}
                    handlePrevPageButtonClick={() => {}}
                    handleNextPageButtonClick={() => {}}
                    onPageClick={() => {}}
                />
            </div>
            <div className="sidebar-block">
                <SettingsCard
                    onEdit={openModel}
                    header="Payout Beneficiary address"
                    contentHeader={beneficiary}
                    isLoading={!beneficiary}
                    content={
                        <>
                            <div>This is where you will get paid your ETH. Don't have a wallet?</div>
                            <p>
                                <a href="#">Click here.</a>
                            </p>
                        </>
                    }
                />
            </div>
            <WalletModal
                isOpen={state.isModalOpen}
                onClose={() => {
                    setState({ ...state, isModalOpen: false });
                }}
            />
        </div>
    );
};

export default connect(mapStateToProps)(Wallet);
