/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Session, SessionStatus, Stats } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';

import formatCurrency from '../../../../../commons/formatCurrency';
import formatBytes from '../../../../../commons/formatBytes';
import secondsToISOTime from '../../../../../commons/secondsToISOTime';
import displayMyst from '../../../../../commons/displayMyst';
import '../../../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss';

import SessionCard from './SessionCard';

export interface SessionsSideListPropsInterface {
    liveSessions?: Session[];
    liveSessionStats?: Stats;
}

const sumBytes = (sessionStats?: Stats) => {
    return (sessionStats?.sumBytesSent || 0) + (sessionStats?.sumBytesReceived || 0);
};

const SessionsSideList: React.FC<SessionsSideListPropsInterface> = ({ liveSessions, liveSessionStats }) => {
    const mappedSessionCards = (liveSessions || []).map((s) => (
        <SessionCard
            key={s.id}
            country={s.providerCountry}
            status={s.status === SessionStatus.NEW}
            id={s.id}
            time={secondsToISOTime(s.duration)}
            data={formatBytes(s.bytesSent)}
            value={displayMyst(s.tokens)}
        />
    ));

    return (
        <div className="side-block">
            <p className="heading">Live Sessions</p>
            <div className="side-block--content">
                {liveSessions === undefined ? (
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                ) : (
                    <div className="sessions-wrapper">
                        {mappedSessionCards || <div>No session history</div>}
                        <div className="button-block">
                            <div onClick={() => alert('click')} className="btn btn-empty btn-center all">
                                <span className="btn-text">View all sessions</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className="sum-wrapper">
                    <div className="sum-block">
                        <div className="name">{displayMyst(liveSessionStats?.sumTokens)}</div>
                        <div className="explanation">Live earnings</div>
                    </div>
                    <div className="sum-block">
                        <div className="name">{formatBytes(sumBytes(liveSessionStats))}</div>
                        <div className="explanation">Live data</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionsSideList;
