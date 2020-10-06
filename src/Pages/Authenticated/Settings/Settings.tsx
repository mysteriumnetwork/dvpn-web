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
import { AppState } from '../../../redux/app.slice';
import { RootState } from '../../../redux/store';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';
import { parseMMNError } from '../../../commons/error.utils';

import MMN from './Components/MMN';
import PasswordChange from './Components/PasswordChange';
import IdentityBackup from './Components/IdentityBackup';

import './Setings.scss';
import { mmnWebAddress } from '../../../commons/config.utls';

interface StateInterface {
    apiKey: string;
}

interface Props {
    app: AppState;
}

const mapStateToProps = (state: RootState) => ({
    app: state.app,
});

const Settings = ({ app }: Props): JSX.Element => {
    const [state, setState] = React.useState<StateInterface>({
        apiKey: '',
    });

    const { currentIdentity, config } = app;
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        tequilapiClient
            .getMMNApiKey()
            .then((response: any) => setState({ ...state, apiKey: response.apiKey }))
            .catch((err) => {
                enqueueSnackbar(parseMMNError(err), { variant: 'error' });
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
                            <IdentityBackup identity={currentIdentity?.id || ''} />
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
