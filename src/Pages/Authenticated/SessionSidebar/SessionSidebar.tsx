/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import { Session, SessionStatus, SessionStats, SessionDirection } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './SessionSidebar.scss';

import formatBytes, { add } from '../../../commons/formatBytes';
import secondsToISOTime from '../../../commons/secondsToISOTime';
import { displayMyst } from '../../../commons/money.utils';
import { SESSIONS } from '../../../constants/routes';
import { RootState } from '../../../redux/store';
import { tequilapiClient } from '../../../api/TequilApiClient';
import { parseError } from '../../../commons/error.utils';

import SessionCard from './SessionCard';

const mapStateToProps = ({ sse, app }: RootState) => ({
    filterProviderId: app?.currentIdentity?.id,
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

export interface Props {
    liveSessions?: Session[];
    liveSessionStats?: SessionStats;
    displayNavigation?: boolean;
    liveSessionsOnly?: boolean;
    filterDirection?: SessionDirection;
    filterProviderId?: string;
    sessionsLimit?: number;
    headerText: string;
}

interface StateProps {
    historySessions: Session[];
}

const SessionSidebar = ({
    liveSessions,
    liveSessionStats,
    displayNavigation,
    liveSessionsOnly,
    filterDirection = SessionDirection.PROVIDED,
    filterProviderId,
    sessionsLimit = 10,
    headerText,
}: Props) => {
    const [state, setState] = useState<StateProps>({ historySessions: [] });

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!liveSessionsOnly) {
            tequilapiClient
                .sessions({ direction: filterDirection, providerId: filterProviderId, pageSize: sessionsLimit })
                .then((resp) => setState({ ...state, historySessions: resp.items }))
                .catch((err) => {
                    enqueueSnackbar(parseError(err) || 'Fetching Sessions Failed!');
                    console.log(err);
                });
        }
    }, []);

    const historyCards = state.historySessions.map((hs) => toSessionCard(hs));
    const latestSessionCards = (liveSessions || []).map((ls) => toSessionCard(ls)).concat(historyCards);

    return (
        <div className="latest-sessions">
            <p className="latest-sessions__heading">{headerText}</p>
            <div className="latest-sessions__content">
                {!liveSessions ? (
                    <div className="spinner">
                        <CircularProgress />
                    </div>
                ) : (
                    <div>{latestSessionCards || <div>No sessions</div>}</div>
                )}
            </div>
            {displayNavigation && (
                <div className="latest-sessions__button-block">
                    <Link to={SESSIONS} className="btn btn--outline-primary">
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
