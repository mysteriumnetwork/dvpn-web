/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Session, SessionStatus, SessionStats } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import formatBytes, { add } from '../../../commons/formatBytes';
import secondsToISOTime from '../../../commons/secondsToISOTime';
import { displayMyst } from '../../../commons/money.utils';
import { SESSIONS } from '../../../constants/routes';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';

import './SessionSidebar.scss';

import SessionCard from './SessionCard';

export interface SessionSidebarPropsInterface {
    liveSessions?: Session[];
    liveSessionStats?: SessionStats;
    displayNavigation?: boolean;
}

const mapStateToProps = ({ sse }: RootState) => ({
    liveSessions: sse.appState?.sessions,
    liveSessionStats: sse.appState?.sessionsStats,
});

const sumBytes = (sessionStats?: SessionStats) => {
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

interface StateProps {
    historySessions?: Session[];
}

const SessionSidebar: FC<SessionSidebarPropsInterface> = ({
    liveSessions,
    liveSessionStats,
    displayNavigation,
}) => {
    const [state, setState] = useState<StateProps>({});
    useEffect(() => {
        tequilapiClient
            .sessions({ pageSize: 10 })
            .then((resp) => setState({ ...state, historySessions: resp.items }))
            .catch((err) => {});
    }, []);
    const historySessionsDefined = state.historySessions || [];
    const historySessionCount = historySessionsDefined.length >= 10 ? 10 : historySessionsDefined.length;
    const historyCards = historySessionsDefined.slice(0, historySessionCount - 1).map((hs) => toSessionCard(hs));
    const latestSessionCards = (liveSessions || []).map((ls) => toSessionCard(ls)).concat(historyCards);

    const history = useHistory();

    return (
        <div className="latest-sessions">
            <p className="latest-sessions__heading">Latest Sessions</p>
            <div className="latest-sessions__content">
                {!liveSessions ? (
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>{latestSessionCards || <div>No session history</div>}</div>
                )}
            </div>
            {displayNavigation && (
                <div className="latest-sessions__button-block">
                    <Link to={SESSIONS} className="btn btn-empty btn-center all">
                        <span className="btn-text">View all sessions</span>
                    </Link>
                </div>
            )}
            <div className="latest-sessions__footer">
                <div className="latest-sessions__footer__sum-block">
                    <div className="name">{displayMyst(liveSessionStats?.sumTokens)}</div>
                    <div className="explanation">Live earnings</div>
                </div>
                <div className="latest-sessions__footer__sum-block">
                    <div className="name">{formatBytes(sumBytes(liveSessionStats))}</div>
                    <div className="explanation">Live data</div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(SessionSidebar);
