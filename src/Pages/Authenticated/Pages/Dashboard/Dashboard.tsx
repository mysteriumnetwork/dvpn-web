/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import '../../../../assets/styles/pages/authenticated/pages/dashboard.scss';
import { CircularProgress, Fade, Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import { Identity, SessionResponse } from 'mysterium-vpn-js';

import { ReactComponent as Logo } from '../../../../assets/images/authenticated/pages/dashboard/logo.svg';
import Header from '../../Components/Header';
import { DefaultSlider } from '../../../../Components/DefaultSlider';
import { DEFAULT_PRICE_PER_GB, DEFAULT_PRICE_PER_MINUTE_PRICE } from '../../../../Services/constants';
import { DefaultSwitch } from '../../../../Components/DefaultSwitch';
import { RootState } from '../../../../redux/store';
import { fetchSessions, fetchIdentity } from '../../../../redux/actions/dashboard/dashboard';
import { SSEState } from '../../../../redux/actions/sse/sse';

import SessionsSideList from './SessionsSideList/SessionsSideList';
import GraphCard from './GraphCard';
import EarningStatisticBlock from './EarningStatiscticBlock';
import NatStatus from './NatStatus/NatStatus';
import Services from './Services/Services';
import Statistics from './Statistics/Statistics';

interface PropsInterface {
    sessions: {
        isLoading: boolean;
        sessionResponse?: SessionResponse;
    };
    currentIdentity?: Identity;
    sse: SSEState;
    fetchSessions: () => void;
    fetchIdentity: () => void;
}

const mapStateToProps = (state: RootState) => ({
    sessions: state.dashboard.sessions,
    currentIdentity: state.dashboard.currentIdentity,
    sse: state.sse,
});

const mapDispatchToProps = {
    fetchSessions,
    fetchIdentity,
};

const Dashboard: React.FC<PropsInterface> = ({ fetchSessions, fetchIdentity, currentIdentity, sessions, sse }) => {
    const [values, setValues] = useState({
        open: false,
        modalServiceName: 'name',
        pricePerMinute: DEFAULT_PRICE_PER_MINUTE_PRICE,
        pricePerGb: DEFAULT_PRICE_PER_GB,
        partnersOn: true,
        limitOn: false,
    });

    useEffect(() => {
        fetchSessions();
        fetchIdentity();
    }, []);

    const handleClose = () => {
        setValues({ ...values, open: false });
    };

    const handlePricePerMinuteChanged = (event: any, newValue: number) => {
        setValues({
            ...values,
            pricePerMinute: newValue,
        });
    };

    const handlePricePerGbChanged = (event: any, newValue: number) => {
        setValues({
            ...values,
            pricePerGb: newValue,
        });
    };

    const handlePartnersOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, partnersOn: event.target.checked });
    };

    const handleLimitOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, limitOn: event.target.checked });
    };

    const stats = sessions?.sessionResponse?.stats;
    const serviceInfo = sse.appState?.serviceInfo;
    const liveSessions = sse.appState?.sessions;
    const liveSessionsStats = sse.appState?.sessionsStats;
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
                    <EarningStatisticBlock
                        month="May"
                        mystValue="48.2223 MYST"
                        earnings="$48.22"
                        residentialPosition="8"
                        residentialPositionOf="250"
                        countryPosition="1"
                        countryPositionOf="8"
                    />
                    <GraphCard statsDaily={sessions?.sessionResponse?.statsDaily || {}} month="May" />
                </div>
                <div className="dashboard--services-row">
                    <div className="heading-row">
                        <p className="heading">Services</p>
                        <NatStatus status={status} />
                    </div>
                    <div className="services-blocks-row">
                        <Services identityRef={currentIdentity?.id} servicesInfos={serviceInfo} />
                    </div>
                </div>
            </div>
            <div className="dashboard--side">
                <SessionsSideList liveSessions={liveSessions} liveSessionStats={liveSessionsStats} />
            </div>
            <Modal
                className="settings-modal"
                open={values.open}
                onClose={handleClose}
                closeAfterTransition
                disableAutoFocus={true}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={values.open}>
                    <div className="settings-modal--block">
                        <div className="title">{values.modalServiceName} Settings</div>
                        <div className="settings-row">
                            <div className="settings-row--slider">
                                <p>Price per minute</p>
                                <DefaultSlider
                                    value={values.pricePerMinute}
                                    handleChange={() => handlePricePerMinuteChanged}
                                    step={0.001}
                                    min={0}
                                    max={0.01}
                                    disabled={false}
                                />
                                <div className="bottom-line">
                                    <p>0 MYST</p>
                                    <p>0.001 MYST</p>
                                </div>
                            </div>
                            <div className="settings-row--slider">
                                <p>Price per GB</p>
                                <DefaultSlider
                                    value={values.pricePerGb}
                                    handleChange={() => handlePricePerGbChanged}
                                    step={0.001}
                                    min={0}
                                    max={0.01}
                                    disabled={false}
                                />
                                <div className="bottom-line">
                                    <p>0 MYST</p>
                                    <p>0.50 MYST</p>
                                </div>
                            </div>
                        </div>
                        <div className="partners-block">
                            <div className="switch-row">
                                <DefaultSwitch
                                    tunedOn={values.partnersOn}
                                    handleChange={() => handlePartnersOnChange}
                                    type="myst"
                                />
                                <p className="text">Only Mysterium verified partner traffic</p>
                            </div>
                            <p className="under-text">
                                Safe option: traffic vetted via business contracts, unavailable to the general public
                                and limited to streaming. This option potentially will give less reward.
                            </p>
                        </div>
                        <div className="limits-block">
                            <DefaultSwitch
                                tunedOn={values.limitOn}
                                handleChange={() => handleLimitOnChange}
                                type="myst"
                            />
                            <p className="text">Limit bandwidth to 5Mb/s</p>
                        </div>
                        <div className="buttons-block">
                            <div onClick={() => handleClose()} className="btn close">
                                <span className="btn-text">Close</span>
                            </div>
                            <div onClick={() => alert()} className="btn btn-filled save">
                                <span className="btn-text">Save & Restart</span>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
