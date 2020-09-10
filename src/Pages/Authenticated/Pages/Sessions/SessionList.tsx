/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, ReactElement } from 'react';
import { Session } from 'mysterium-vpn-js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { TablePagination } from '@material-ui/core';

import { displayMyst } from '../../../../commons/money.utils';
import { DEFAULT_MONEY_DISPLAY_OPTIONS } from '../../../../commons';
import formatBytes from '../../../../commons/formatBytes';
import secondsToISOTime from '../../../../commons/secondsToISOTime';
import '../../../../assets/styles/pages/sessionsList.scss';

interface Props {
    sessions: Session[];
    pagination: {
        count: number;
        page: number;
        rowsPerPage: number;
        onChangePage: (event: any, newPage: number) => void;
        onChangeRowsPerPage: (event: any) => void;
    };
}

interface SessionInfo {
    consumerCountry: string;
    myst: string;
    duration: string;
    data: string;
    id: string;
}

const sessionInfo = (s: Session): SessionInfo => {
    return {
        id: s.id,
        myst: displayMyst(s.tokens, DEFAULT_MONEY_DISPLAY_OPTIONS),
        duration: secondsToISOTime(s.duration),
        data: formatBytes(s.bytesSent + s.bytesReceived),
        consumerCountry: s.consumerCountry,
    };
};

interface Column {
    id: 'consumerCountry' | 'earnings' | 'transferred' | 'sessionId' | 'duration';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'consumerCountry', label: 'Country', minWidth: 30 },
    { id: 'earnings', label: 'Earnings', minWidth: 30 },
    { id: 'duration', label: 'Earnings', minWidth: 30 },
    { id: 'transferred', label: 'Transferred', minWidth: 30 },
    { id: 'sessionId', label: 'Session ID', minWidth: 30 },
];

const tableRow = (info: SessionInfo): ReactElement => (
    <TableRow key={info.id}>
        <TableCell>{info.consumerCountry}</TableCell>
        <TableCell>{info.myst}</TableCell>
        <TableCell>{info.data}</TableCell>
        <TableCell>{info.duration}</TableCell>
        <TableCell>{info.id}</TableCell>
    </TableRow>
);

const SessionList: FC<Props> = ({ sessions, pagination }) => {
    const infos = sessions.map((s) => sessionInfo(s));
    return (
        <>
            <TableContainer className="table">
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            {columns.map((c) => (
                                <TableCell key={c.id}>{c.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{infos.map((info) => tableRow(info))}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                colSpan={3}
                rowsPerPage={pagination.rowsPerPage}
                page={pagination.page}
                count={pagination.count}
                onChangePage={pagination.onChangePage}
                onChangeRowsPerPage={pagination.onChangeRowsPerPage}
            />
        </>
    );
};

export default SessionList;
