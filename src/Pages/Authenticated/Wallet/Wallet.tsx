/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC } from 'react';

import Header from '../Components/Header';
import { ReactComponent as Logo } from '../../../assets/images/authenticated/pages/wallet/logo.svg';
import MystTable from '../../../Components/MystTable/MystTable';
import '../../../assets/styles/pages/wallet.scss';

const row = () => (
    <div className="myst-table__content__row">
        <div className="myst-table__content__row__row-value">
            <p>1</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>2</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>3</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>4</p>
        </div>
        <div className="myst-table__content__row__row-value">
            <p>5</p>
        </div>
    </div>
);

const Wallet: FC = ({}) => {
    return (
        <div className="wallet">
            <div className="wallet--content">
                <Header logo={Logo} name="Wallet" />
                <MystTable
                    headers={[
                        { name: 'Date' },
                        { name: 'Beneficiary' },
                        { name: 'Transaction ID' },
                        { name: 'Fee' },
                        { name: 'Received Amount' },
                    ]}
                    rows={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(row)}
                    currentPage={1}
                    lastPage={10}
                    handlePrevPageButtonClick={() => {}}
                    handleNextPageButtonClick={() => {}}
                    onPageClick={() => {}}
                />
            </div>
        </div>
    );
};

export default Wallet;
