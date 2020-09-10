/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, useEffect, useState } from 'react';
import { Pagination, Session, SessionResponse } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';

import Header from '../../Components/Header';
import { ReactComponent as Logo } from '../../../../assets/images/authenticated/pages/sessions/logo.svg';
import { tequilapiClient } from '../../../../api/TequilApiClient';
import '../../../../assets/styles/pages/sessionsList.scss';
import SessionsSideList from '../SessionSideList/SessionsSideList';

import SessionList from './SessionList';

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

    const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setState({ ...state, pageSize: parseInt(event.target.value, 10) });
    };

    const onChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
        setState({ ...state, currentPage: newPage });
    };
    const allSessions = state.sessions;

    return (
        <div className="sessions wrapper">
            <div className="sessions--content">
                <div>
                    <Header logo={Logo} name="Sessions" />
                </div>
                {state.isLoading ? (
                    <CircularProgress className="spinner" />
                ) : (
                    <SessionList
                        sessions={allSessions}
                        pagination={{
                            count: state.paging?.totalItems || 0,
                            page: state.paging?.currentPage || 1,
                            rowsPerPage: state.pageSize,
                            onChangePage: onChangePage,
                            onChangeRowsPerPage: onChangeRowsPerPage,
                        }}
                    />
                )}
            </div>
            <div className="sessions--side">
                <SessionsSideList />
            </div>
        </div>
    );
};

export default Sessions;
