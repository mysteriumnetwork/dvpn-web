/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import '../../../assets/styles/pages/authenticated/pages/dashboard.scss';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { SessionStats } from 'mysterium-vpn-js';
import { Config } from 'mysterium-vpn-js/lib/config/config';

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg';
import Header from '../../../Components/Header';
import { RootState } from '../../../redux/store';
import { fetchIdentity, GeneralState } from '../../../redux/actions/general';
import { SSEState } from '../../../redux/actions/sse';
import SessionSidebar from '../SessionSidebar/SessionSidebar';
import { tequilapiClient } from '../../../api/TequilApiClient';

import GraphCard from './GraphCard';
import NatStatus from './NatStatus/NatStatus';
import Services from './Services/Services';
import Statistics from './Statistics/Statistics';

interface Props {
    general: GeneralState;
    sse: SSEState;
    fetchIdentity: () => void;
}

const mapStateToProps = (state: RootState) => ({
    general: state.general,
    sse: state.sse,
});

const mapDispatchToProps = {
    fetchIdentity,
};

interface StateProps {
    sessionStats: SessionStats;
    sessionStatsDaily: {
        [date: string]: SessionStats;
    };
    userConfig: Config;
}

const Dashboard: React.FC<Props> = ({ fetchIdentity, general, sse }) => {
    const [state, setState] = useState<StateProps>({
        sessionStats: {
            count: 0,
            countConsumers: 0,
            sumBytesReceived: 0,
            sumBytesSent: 0,
            sumDuration: 0,
            sumTokens: 0,
        },
        sessionStatsDaily: {},
        userConfig: { data: {} },
    });
    useEffect(() => {
        fetchIdentity();

        Promise.all([tequilapiClient.sessions(), tequilapiClient.userConfig()])
            .then((result) => {
                const { stats, statsDaily } = result[0];
                setState({
                    ...state,
                    sessionStats: stats,
                    sessionStatsDaily: statsDaily,
                    userConfig: result[1] as Config,
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const { currentIdentity } = general;
    const serviceInfo = sse.appState?.serviceInfo;
    const { status } = { ...sse.appState?.natStatus };

    if (!currentIdentity) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <div className="main">
            <div className="main-block main-block--split">
                <Header logo={Logo} name="Dashboard" />
                <div className="dashboard--top-stats-block">
                    <Statistics stats={state.sessionStats} />
                </div>
                <div className="dashboard--earnings-row">
                    <GraphCard statsDaily={state.sessionStatsDaily} />
                </div>
                <div className="dashboard--services-row">
                    <div className="heading-row">
                        <p className="heading">Services</p>
                        <NatStatus status={status} />
                    </div>
                    <div className="services-blocks-row">
                        <Services
                            identityRef={currentIdentity?.id}
                            servicesInfos={serviceInfo}
                            userConfig={state.userConfig}
                        />
                    </div>
                </div>
            </div>
            <div className="sidebar-block">
                <SessionSidebar displayNavigation />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
