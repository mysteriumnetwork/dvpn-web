/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactElement } from 'react';
import PaginationMaterial from '@material-ui/lab/Pagination';

import './Table.scss';
import Button from '../Buttons/Button';

export interface TableHeader {
    name: string;
    className?: string;
}

export interface TableRow {
    cells: TableCell[];
    key: string;
}

export interface TableCell {
    content: ReactElement | string;
    className?: string;
}

interface Props {
    headers: TableHeader[];
    rows: TableRow[];
    currentPage: number;
    lastPage: number;
    handlePrevPageButtonClick: () => void;
    handleNextPageButtonClick: () => void;
    onPageClick: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const header = (h: TableHeader) => <div className={'cell ' + h.className || ''}>{h.name}</div>;

const Table = ({
    headers,
    rows,
    currentPage,
    lastPage,
    onPageClick,
    handlePrevPageButtonClick,
    handleNextPageButtonClick,
}: Props): JSX.Element => {
    return (
        <div className="table">
            <div className="table__header">{headers.map(header)}</div>
            <div className="table__body">
                {rows.map((row) => {
                    return (
                        <div className="row" key={row.key}>
                            {row.cells.map((cell) => {
                                return <div className={'cell ' + cell.className || ''}>{cell.content}</div>;
                            })}
                        </div>
                    );
                })}
            </div>
            <div className="table__footer">
                <Button
                    disabled={currentPage === 1}
                    className="prev table__footer__button prev pagination-button"
                    onClick={handlePrevPageButtonClick}
                >
                    <p>Prev</p>
                </Button>
                <div className="table__footer__pagination">
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
                <Button
                    disabled={currentPage === lastPage}
                    className="next table__footer__button"
                    onClick={handleNextPageButtonClick}
                >
                    <p>Next</p>
                </Button>
            </div>
        </div>
    );
};

export default Table;
