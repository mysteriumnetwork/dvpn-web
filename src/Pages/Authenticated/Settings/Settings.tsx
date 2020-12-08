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
import { AppState, currentIdentity } from '../../../redux/app.slice';
import { RootState } from '../../../redux/store';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';
import { parseError, parseMMNError } from '../../../commons/error.utils';

import MMN from './Components/MMN';
import PasswordChange from './Components/PasswordChange';
import IdentityBackup from './Components/IdentityBackup';

import './Setings.scss';
import { mmnWebAddress } from '../../../commons/config.utls';
import PayoutAddress from './Components/PayoutAddress';
import { beneficiary } from '../../../redux/sse.slice';
import { hermesId } from '../../../commons/config';
import { Fees, Identity } from 'mysterium-vpn-js';

interface StateInterface {
    apiKey: string;
    fees?: Fees;
}

interface Props {
    app: AppState;
    beneficiary: string;
    hermesId?: string;
    identity?: Identity;
}

const mapStateToProps = (state: RootState) => ({
    app: state.app,
    beneficiary: beneficiary(state.sse),
    hermesId: hermesId(state.app.config),
    identity: currentIdentity(state.app.currentIdentityRef, state.sse.appState?.identities),
});

const canSettle = (identity?: Identity, fees?: Fees): boolean => {
    if (identity === undefined || fees === undefined) {
        return false;
    }
    return identity?.earnings - fees?.settlement > 0;
};

const Settings = ({ app, beneficiary, hermesId, identity }: Props): JSX.Element => {
    const [state, setState] = React.useState<StateInterface>({
        apiKey: '',
    });

    const { config } = app;
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        tequilapiClient
            .getMMNApiKey()
            .then((response: any) => setState({ ...state, apiKey: response.apiKey }))
            .catch((err) => {
                enqueueSnackbar(parseMMNError(err), { variant: 'error' });
                console.log(err);
            });

        tequilapiClient
            .transactorFees()
            .then((response) => setState({ ...state, fees: response }))
            .catch((err) => {
                enqueueSnackbar(parseError(err), { variant: 'error' });
                console.log(err);
            });
    }, []);

    return (
        <div className="main">
            <div className="main-block">
                <Header logo={Logo} name="Settings" />
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
                            <MMN mmnUrl={mmnWebAddress(config)} apiKey={state.apiKey} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Settings);
