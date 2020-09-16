import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import IdentityBackup from './Components/IdentityBackup';
import { tequilapiClient } from '../../../api/TequilApiClient';

import Header from '../../../Components/Header';
import MMN from './Components/MMN';
import PasswordChange from './Components/PasswordChange';

import { GeneralState } from '../../../redux/actions/general';
import { RootState } from '../../../redux/store';

import '../../../assets/styles/pages/authenticated/pages/setings.scss';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/settings/logo.svg';

interface StateInterface {
    apiKey: string
}

interface Props {
    general: GeneralState
}

const mapStateToProps = (state: RootState) => ({
    general: state.general,
});

const mapDispatchToProps = {};

const Settings: React.FC<Props> = ({ general }) => {
    const [values, setValues] = React.useState<StateInterface>({
        apiKey: '',
    });

    const { currentIdentity } = general;

    useEffect(() => {
        tequilapiClient
            .getMMNApiKey()
            .catch(() => {
            })
            .then((response: any) => {
                setValues({ ...values, apiKey: response.apiKey });
            });
    }, []);

    return (
        <div className="settings wrapper">
            <div className="settings--content">
                <Header logo={Logo} name="Settings"/>
                <div className="settings--blocks">

                    <div className="settings--block identity">
                        <p className="heading">Identity</p>
                        <div className="content">
                            <IdentityBackup identity={currentIdentity?.id || ''} />
                        </div>
                    </div>

                    <div className="settings--block identity">
                        <p className="heading">WebUI security</p>
                        <div className="content">
                            <PasswordChange/>
                        </div>
                    </div>

                    <div className="settings--block identity">
                        <p className="heading">MMN integration</p>
                        <div className="content">
                            <MMN apiKey={values.apiKey}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
