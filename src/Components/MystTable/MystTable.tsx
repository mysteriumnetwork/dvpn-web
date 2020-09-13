/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, ReactElement } from 'react';
import PaginationMaterial from '@material-ui/lab/Pagination';

import '../../assets/styles/components/_mystTable.scss';
import LoadingButton from '../Buttons/LoadingButton';

export interface TableHeader {
    name: string;
    className?: string;
}

interface Props {
    headers: TableHeader[];
    rows: ReactElement[];
    currentPage: number;
    lastPage: number;
    handlePrevPageButtonClick: () => void;
    handleNextPageButtonClick: () => void;
    onPageClick: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const header = (h: TableHeader) => (
    <div className={'myst-table__header-cell'}>
        <p>{h.name}</p>
    </div>
);

const MystTable: FC<Props> = ({
    headers,
    rows,
    currentPage,
    lastPage,
    onPageClick,
    handlePrevPageButtonClick,
    handleNextPageButtonClick,
}) => {
    return (
        <div className="myst-table">
            <div className="myst-table__header">{headers.map(header)}</div>
            <div className="myst-table__content">{rows}</div>
            <div className="myst-table__footer">
                <LoadingButton
                    disabled={currentPage === 1}
                    className="prev myst-table__footer__button prev pagination-button"
                    onClick={handlePrevPageButtonClick}
                >
                    <p>Prev</p>
                </LoadingButton>
                <div className="myst-table__footer__pagination">
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
                    className="next myst-table__footer__button"
                    onClick={handleNextPageButtonClick}
                >
                    <p>Next</p>
                </LoadingButton>
            </div>
        </div>
    );
};

export default MystTable;
