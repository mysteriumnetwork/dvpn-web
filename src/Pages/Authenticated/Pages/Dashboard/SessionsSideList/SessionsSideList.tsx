/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { useHistory } from 'react-router';
import { Session, SessionStatus, Stats } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';

import formatBytes, { add } from '../../../../../commons/formatBytes';
import secondsToISOTime from '../../../../../commons/secondsToISOTime';
import '../../../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss';
import { displayMyst } from '../../../../../commons/money.utils';
import { SESSIONS } from '../../../../../constants/routes';

import SessionCard from './SessionCard';

export interface SessionsSideListPropsInterface {
    liveSessions?: Session[];
    liveSessionStats?: Stats;
    historySessions?: Session[];
}

const sumBytes = (sessionStats?: Stats) => {
    return (sessionStats?.sumBytesSent || 0) + (sessionStats?.sumBytesReceived || 0);
};

const toSessionCard = ({
    id,
    consumerCountry,
    status,
    duration,
    bytesSent,
    bytesReceived,
    tokens,
}: Session): JSX.Element => {
    return (
        <SessionCard
            key={id}
            country={consumerCountry}
            status={status === SessionStatus.NEW}
            id={id}
            time={secondsToISOTime(duration)}
            data={formatBytes(add(bytesSent, bytesReceived))}
            value={displayMyst(tokens)}
        />
    );
};

const SessionsSideList: React.FC<SessionsSideListPropsInterface> = ({
    liveSessions,
    liveSessionStats,
    historySessions,
}) => {
    const historySessionsDefined = historySessions || [];
    const historySessionCount = historySessionsDefined.length >= 10 ? 10 : historySessionsDefined.length;

    const historyCards = historySessionsDefined.slice(0, historySessionCount - 1).map((hs) => toSessionCard(hs));
    const liveCards = (liveSessions || []).map((ls) => toSessionCard(ls)).concat(historyCards);

    const history = useHistory();

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
                        {liveCards || <div>No session history</div>}
                        <div className="button-block">
                            <div
                                onClick={() => {
                                    history.push(SESSIONS);
                                }}
                                className="btn btn-empty btn-center all"
                            >
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
