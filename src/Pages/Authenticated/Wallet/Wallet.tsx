/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { AppState, Identity } from 'mysterium-vpn-js';

import Header from '../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import MystTable from '../../../Components/MystTable/MystTable';
import '../../../assets/styles/pages/wallet.scss';
import LoadingButton from '../../../Components/Buttons/LoadingButton';
import { displayMyst } from '../../../commons/money.utils';
import { RootState } from '../../../redux/store';

import SettingsCard from './SettingsCard';
import WalletModal from './WalletModal';

const row = () => (
    <div className="myst-table__content__row">
        <div className="myst-table__content__row__row-value">
            <p>1</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>2</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>3</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>4</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>5</p>
        </div>
    </div>
);

interface StateProps {
    unsettledEarnings: number;
    isModalOpen: boolean;
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
                    <LoadingButton className="btn btn-filled">
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
                    rows={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(row)}
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
                    contentHeader="TODO find wallet address"
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
