/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { Pagination, Session } from 'mysterium-vpn-js';

import Header from '../Components/Header';
import '../../../assets/styles/pages/authenticated/pages/sessions.scss';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/sessions/logo.svg';
import { tequilapiClient } from '../../../api/TequilApiClient';
import '../../../assets/styles/pages/sessionsList.scss';
import SessionsSideList from '../SessionSideList/SessionsSideList';
import MystTable from '../../../Components/MystTable/MystTable';
import secondsToISOTime from '../../../commons/secondsToISOTime';
import { displayMyst } from '../../../commons/money.utils';
import formatBytes from '../../../commons/formatBytes';

interface StateProps {
    isLoading: boolean;
    pageSize: number;
    sessions: Session[];
    paging?: Pagination;
    currentPage: number;
}

const row = (s: Session) => (
    <div className="list-block--item">
        <div className="value country">
            <div className="country-placeholder"></div>
            <p>{s.consumerCountry}</p>
        </div>
        <div className="value duration">
            <p>{secondsToISOTime(s.duration)}</p>
        </div>
        <div className="value earnings">
            <p>{displayMyst(s.tokens)}</p>
        </div>
        <div className="value transferred">
            <p>{formatBytes(s.bytesReceived + s.bytesSent)}</p>
        </div>
        <div className="value id">
            <p>{s.id.split('-')[0]}</p>
        </div>
    </div>
);

const Sessions: FC = () => {
    const [state, setState] = useState<StateProps>({
        sessions: [],
        isLoading: true,
        pageSize: 10,
        currentPage: 1,
    });
    useEffect(() => {
        Promise.all([1])
            .then(() => tequilapiClient.sessions({ pageSize: state.pageSize, page: state.currentPage }))
            .then((resp) => setState({ ...state, isLoading: false, sessions: resp.sessions, paging: resp.paging }))
            .catch((err) => {});
    }, [state.pageSize, state.currentPage]);

    const handlePrevPageButtonClick = () => {
        setState({ ...state, currentPage: state.currentPage - 1 });
    };

    const handleNextPageButtonClick = () => {
        setState({
            ...state,
            currentPage: state.currentPage + 1,
        });
    };

    const onPageClicked = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setState({ ...state, currentPage: pageNumber });
    };

    return (
        <div className="sessions">
            <div className="sessions--content">
                <Header logo={Logo} name="Sessions" />
                <MystTable
                    headers={[
                        { name: 'Country' },
                        { name: 'Duration' },
                        { name: 'Earnings' },
                        { name: 'Transferred' },
                        { name: 'Session ID' },
                    ]}
                    rows={state.sessions.map(row)}
                    currentPage={state.currentPage}
                    lastPage={state?.paging?.totalPages || 0}
                    handlePrevPageButtonClick={handlePrevPageButtonClick}
                    handleNextPageButtonClick={handleNextPageButtonClick}
                    onPageClick={onPageClicked}
                />
            </div>
            <div className="sessions--side">
                <SessionsSideList />
            </div>
        </div>
    );
};

export default Sessions;
