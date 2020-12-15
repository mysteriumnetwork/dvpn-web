/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';

import { tequilapiClient } from '../../../api/TequilApiClient';
import Header from '../../../Components/Header';
import { currentIdentity } from '../../../redux/app.slice';
import { RootState } from '../../../redux/store';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';
import { parseError, parseMMNError } from '../../../commons/error.utils';

import MMN from './Components/MMN';
import PasswordChange from './Components/PasswordChange';
import IdentityBackup from './Components/IdentityBackup';

import './Setings.scss';
import { mmnWebAddress, hermesId } from '../../../commons/config';
import PayoutAddress from './Components/PayoutAddress';
import { beneficiary } from '../../../redux/sse.slice';
import { Fees, Identity } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import Version from './Components/Version';

interface StateInterface {
    apiKey: string;
    fees?: Fees;
}

interface Props {
    beneficiary: string;
    hermesId?: string;
    identity?: Identity;
    mmnWebAddress: string;
}

const mapStateToProps = (state: RootState) => ({
    beneficiary: beneficiary(state.sse),
    hermesId: hermesId(state.app.config),
    identity: currentIdentity(state.app.currentIdentityRef, state.sse.appState?.identities),
    mmnWebAddress: mmnWebAddress(state.app.config),
});

const canSettle = (identity?: Identity, fees?: Fees): boolean => {
    if (identity === undefined || fees === undefined) {
        return false;
    }
    return identity?.earnings - fees?.settlement > 0;
};

const Settings = ({ beneficiary, hermesId, identity, mmnWebAddress }: Props): JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [state, setState] = React.useState<StateInterface>({
        apiKey: '',
    });

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        Promise.all([tequilapiClient.getMMNApiKey(), tequilapiClient.transactorFees()])
            .then(([mmn, fees]) => {
                setState({ ...state, apiKey: mmn.apiKey, fees: fees });
            })
            .catch((err) => {
                enqueueSnackbar(parseMMNError(err) || parseError(err), { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <>
            <div className="main">
                <div className="main-block">
                    <div className="settings-header">
                        <Header logo={Logo} name="Settings" />
                        <Version />
                    </div>
                    <div className="settings">
                        <div className="settings__block">
                            <p className="heading">Identity</p>
                            <div className="content">
                                <IdentityBackup identity={identity?.id || ''} />
                            </div>

                            <p className="heading m-t-20">Beneficiary (payout address)</p>
                            <div className="content">
                                <PayoutAddress
                                    canSettle={canSettle(identity, state.fees)}
                                    beneficiary={beneficiary}
                                    hermesId={hermesId}
                                    providerId={identity?.id}
                                />
                            </div>
                        </div>

                        <div className="settings__block">
                            <p className="heading">WebUI security</p>
                            <div className="content">
                                <PasswordChange />
                            </div>
                        </div>

                        <div className="settings__block">
                            <p className="heading">MMN integration</p>
                            <div className="content">
                                <MMN mmnUrl={mmnWebAddress} apiKey={state.apiKey} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default connect(mapStateToProps)(Settings);
