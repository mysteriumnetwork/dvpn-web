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

import Header from '../../../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import MystTable from '../../../Components/MystTable/MystTable';
import '../../../assets/styles/pages/wallet.scss';
import LoadingButton from '../../../Components/Buttons/LoadingButton';
import { displayMyst } from '../../../commons/money.utils';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';

import SettingsCard from './SettingsCard';
import WalletModal from './WalletModal';

const row = (s: Settlement) => (
    <div className="myst-table__content__row">
        <div className="myst-table__content__row__row-value">
            <p>{s.settledAt}</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>{s.beneficiary}</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>{s.txHash}</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>{}</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>{s.amount}</p>
        </div>
    </div>
);

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
        <div className="wallet">
            <div className="wallet__content">
                <Header logo={Logo} name="Wallet" />
                <div className="wallet__earnings">
                    <div className="wallet__earnings__myst">
                        <p className="stat">{displayMyst(earnings(appState, identity?.id))}</p>
                        <p className="name">Unsettled Earnings</p>
                    </div>
                    <LoadingButton disabled={!isSettlementPossible()} onClick={settle} className="btn btn-filled">
                        <span className="btn-text-white">Settle Now</span>
                    </LoadingButton>
                </div>
                <MystTable
                    headers={[
                        { name: 'Date' },
                        { name: 'Beneficiary' },
                        { name: 'Transaction ID' },
                        { name: 'Fee' },
                        { name: 'Received Amount' },
                    ]}
                    rows={(state.settlementResponse?.items || []).map(row)}
                    currentPage={1}
                    lastPage={10}
                    handlePrevPageButtonClick={() => {}}
                    handleNextPageButtonClick={() => {}}
                    onPageClick={() => {}}
                />
            </div>
            <div className="wallet__side-panel">
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
