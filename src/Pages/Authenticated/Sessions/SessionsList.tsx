/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';
import PaginationMaterial from '@material-ui/lab/Pagination';
import { Session } from 'mysterium-vpn-js';

import secondsToISOTime from '../../../commons/secondsToISOTime';
import { displayMyst } from '../../../commons/money.utils';
import formatBytes from '../../../commons/formatBytes';
import LoadingButton from '../../../Components/Buttons/LoadingButton';

interface Props {
    sessions: Session[];
    currentPage: number;
    lastPage: number;
    handlePrevPageButtonClick: () => void;
    handleNextPageButtonClick: () => void;
    onPageClick: (event: React.ChangeEvent<unknown>, page: number) => void;
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

const SessionList: FC<Props> = ({
    sessions,
    currentPage,
    lastPage,
    onPageClick,
    handlePrevPageButtonClick,
    handleNextPageButtonClick,
}) => {
    return (
        <div className="sessions--list">
            <div className="header-row">
                <div className="header-row--title country">
                    <p>Country</p>
                </div>
                <div className="header-row--title duration">
                    <p>Duration</p>
                </div>
                <div className="header-row--title earnings">
                    <p>Earnings</p>
                </div>
                <div className="header-row--title transferred">
                    <p>Transferred</p>
                </div>
                <div className="header-row--title id">
                    <p>Session ID</p>
                </div>
            </div>
            <div className="list-block">
                {sessions.map(row)}
                <div className="pagination-row">
                    <LoadingButton
                        disabled={currentPage === 1}
                        className="prev pagination-button"
                        onClick={handlePrevPageButtonClick}
                    >
                        <p>Prev</p>
                    </LoadingButton>
                    <div className="pagination">
                        <PaginationMaterial
                            page={currentPage}
                            hideNextButton={true}
                            hidePrevButton={true}
                            count={lastPage}
                            variant="outlined"
                            shape="rounded"
                            onChange={onPageClick}
                        />
                    </div>
                    <LoadingButton
                        disabled={currentPage === lastPage}
                        className="next pagination-button"
                        onClick={handleNextPageButtonClick}
                    >
                        <p>Next</p>
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};

export default SessionList;
