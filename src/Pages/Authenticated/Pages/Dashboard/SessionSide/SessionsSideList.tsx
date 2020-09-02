/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Session, SessionDirection, SessionStatus } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';

import formatCurrency from '../../../../../commons/formatCurrency';
import formatBytes from '../../../../../commons/formatBytes';
import secondsToISOTime from '../../../../../commons/secondsToISOTime';
import '../../../../../assets/styles/pages/authenticated/pages/components/sideBlock.scss';

import SessionBlock from './SessionBlock';

export interface SessionsSideListPropsInterface {
    sessions: Session[];
    isLoading: boolean;
}

const sumArrayNumbers = (numbers: Array<number>): number => {
    return numbers.concat(0).reduce((a, b) => a + b);
};
const SessionsSideList: React.FC<SessionsSideListPropsInterface> = (_props: SessionsSideListPropsInterface) => {
    const props: SessionsSideListPropsInterface = { ..._props };

    const sessionsOfInterest = props.sessions.filter((s) => s.direction === SessionDirection.PROVIDED);
    const mappedSessionCards = sessionsOfInterest.map((s) => (
        <SessionBlock
            country={s.providerCountry}
            status={s.status === SessionStatus.NEW}
            id={s.id}
            time={secondsToISOTime(s.duration)}
            data={formatBytes(s.bytesSent)}
            value={formatCurrency(s.tokens)}
        />
    ));

    const totalTokens = sumArrayNumbers(sessionsOfInterest.map((s) => s.tokens));
    const totalSizeBytes = sumArrayNumbers(sessionsOfInterest.map((s) => s.bytesSent));

    return (
        <div className="side-block">
            <p className="heading">Last sessions</p>
            <div className="side-block--content">
                {props.isLoading ? (
                    <div className="index-route-spinner">
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
                        <div className="name">{formatCurrency(totalTokens)}</div>
                        <div className="explanation">Live earnings</div>
                    </div>
                    <div className="sum-block">
                        <div className="name">{formatBytes(totalSizeBytes)}</div>
                        <div className="explanation">{formatBytes(totalSizeBytes)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionsSideList;
