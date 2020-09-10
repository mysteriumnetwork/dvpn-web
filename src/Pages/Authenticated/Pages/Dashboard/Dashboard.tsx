/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import '../../../../assets/styles/pages/authenticated/pages/dashboard.scss';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../../../assets/images/authenticated/pages/dashboard/logo.svg';
import Header from '../../Components/Header';
import { RootState } from '../../../../redux/store';
import { fetchSessions, fetchIdentity, fetchUserConfig, DashboardState } from '../../../../redux/actions/dashboard';
import { SSEState } from '../../../../redux/actions/sse';
import SessionsSideList from '../SessionSideList/SessionsSideList';

import GraphCard from './GraphCard';
import NatStatus from './NatStatus/NatStatus';
import Services from './Services/Services';
import Statistics from './Statistics/Statistics';

interface Props {
    dashboard: DashboardState;
    sse: SSEState;
    fetchSessions: () => void;
    fetchIdentity: () => void;
    fetchUserConfig: () => void;
}

const mapStateToProps = (state: RootState) => ({
    dashboard: state.dashboard,
    sse: state.sse,
});

const mapDispatchToProps = {
    fetchSessions,
    fetchIdentity,
    fetchUserConfig,
};

const Dashboard: React.FC<Props> = ({ fetchSessions, fetchIdentity, fetchUserConfig, dashboard, sse }) => {
    useEffect(() => {
        fetchSessions();
        fetchIdentity();
        fetchUserConfig();
    }, []);

    const { currentIdentity, sessions, config } = dashboard;
    const stats = sessions?.sessionResponse?.stats;
    const serviceInfo = sse.appState?.serviceInfo;
    const { status } = { ...sse.appState?.natStatus };

    if (!currentIdentity) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <div className="dashboard wrapper">
            <div className="dashboard--content">
                <Header logo={Logo} name="Dashboard" />
                <div className="dashboard--top-stats-block">
                    <Statistics stats={stats} />
                </div>
                <div className="dashboard--earnings-row">
                    <GraphCard statsDaily={sessions?.sessionResponse?.statsDaily || {}} />
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
                            userConfig={config.userConfig}
                        />
                    </div>
                </div>
            </div>
            <div className="dashboard--side">
                <SessionsSideList displayNavigation />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
