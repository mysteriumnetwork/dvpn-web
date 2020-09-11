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

import SessionList from './SessionsList';

interface StateProps {
    isLoading: boolean;
    pageSize: number;
    sessions: Session[];
    paging?: Pagination;
    currentPage: number;
}

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
        <div className="sessions wrapper">
            <div className="sessions--content">
                <Header logo={Logo} name="Sessions" />
                <SessionList
                    sessions={state.sessions}
                    currentPage={state.currentPage}
                    lastPage={state?.paging?.totalPages || 0}
                    onPageClick={onPageClicked}
                    handlePrevPageButtonClick={handlePrevPageButtonClick}
                    handleNextPageButtonClick={handleNextPageButtonClick}
                />
            </div>
            <div className="sessions--side">
                <SessionsSideList />
            </div>
        </div>
    );
};

export default Sessions;
