/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Dispatch, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { SessionStats } from 'mysterium-vpn-js';
import { useSnackbar } from 'notistack';

import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/dashboard/logo.svg';
import Header from '../../../Components/Header';
import { RootState } from '../../../redux/store';
import { fetchConfigAsync, fetchIdentityAsync } from '../../../redux/app.async.actions';
import { AppState } from '../../../redux/app.slice';
import { SSEState } from '../../../redux/sse.slice';
import SessionSidebar from '../SessionSidebar/SessionSidebar';
import { tequilapiClient } from '../../../api/TequilApiClient';
import { parseError } from '../../../commons/error.utils';

import './Dashboard.scss';
import Charts from './Charts/Charts';
import NatStatus from './NatStatus/NatStatus';
import Services from './Services/Services';
import Statistics from './Statistics/Statistics';

interface Props {
    app: AppState;
    sse: SSEState;
    actions: {
        fetchIdentityAsync: () => void;
        fetchConfigAsync: () => void;
    };
}

const mapStateToProps = (state: RootState) => ({
    app: state.app,
    sse: state.sse,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        actions: {
            fetchIdentityAsync: () => dispatch(fetchIdentityAsync()),
            fetchConfigAsync: () => dispatch(fetchConfigAsync()),
        },
    };
};

interface StateProps {
    sessionStatsAllTime: SessionStats;
    sessionStatsDaily: {
        [date: string]: SessionStats;
    };
}

const Dashboard = ({ actions, app, sse }: Props) => {
    const [state, setState] = useState<StateProps>({
        sessionStatsAllTime: {
            count: 0,
            countConsumers: 0,
            sumBytesReceived: 0,
            sumBytesSent: 0,
            sumDuration: 0,
            sumTokens: 0,
        },
        sessionStatsDaily: {},
    });

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        actions.fetchIdentityAsync();
        actions.fetchConfigAsync();
        Promise.all([tequilapiClient.sessionStatsDaily(), tequilapiClient.sessionStatsAggregated()])
            .then((result) => {
                const [{ items: statsDaily }, { stats: allTimeStats }] = result;
                setState({
                    ...state,
                    sessionStatsDaily: statsDaily,
                    sessionStatsAllTime: allTimeStats,
                });
            })
            .catch((err) => {
                enqueueSnackbar(parseError(err), { variant: 'error' });
                console.log(err);
            });
    }, []);

    const { currentIdentity, config } = app;
    const { appState } = sse;
    if (!currentIdentity || !appState || !config) {
        return <CircularProgress className="spinner" />;
    }

    const serviceInfo = appState.serviceInfo;
    const { status } = appState.natStatus;

    return (
        <div className="main">
            <div className="main-block main-block--split">
                <Header logo={Logo} name="Dashboard" />
                <div className="dashboard__statistics">
                    <Statistics stats={state.sessionStatsAllTime} unsettledEarnings={currentIdentity.earnings} />
                </div>
                <div className="dashboard__charts">
                    <Charts statsDaily={state.sessionStatsDaily} />
                </div>
                <div className="dashboard__services">
                    <div className="services-header">
                        <p className="services-header__title">Services</p>
                        <div className="services-header__status">
                            <NatStatus status={status} />
                        </div>
                    </div>
                    <Services identityRef={currentIdentity.id} servicesInfos={serviceInfo} userConfig={config} />
                </div>
            </div>
            <div className="sidebar-block">
                <SessionSidebar headerText="Latest Sessions" displayNavigation />
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
