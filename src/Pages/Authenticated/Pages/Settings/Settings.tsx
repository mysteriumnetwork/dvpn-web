import React from 'react';
import Header from '../../Components/Header';
import { ReactComponent as Logo } from '../../../../assets/images/authenticated/pages/settings/logo.svg';

const Settings = () => {
    return (
        <div className="settings wrapper">
            <div className="settings--content">
                <Header logo={Logo} name="Settings" />
            </div>
        </div>
    );
};

export default Settings;
