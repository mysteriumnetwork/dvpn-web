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

const row = () => (
    <div className="content--row">
        <div className="value">
            <p>1</p>
        </div>
        <div className="value">
            <p>2</p>
        </div>
        <div className="value">
            <p>3</p>
        </div>
        <div className="value">
            <p>4</p>
        </div>
        <div className="value">
            <p>5</p>
        </div>
    </div>
);

const Wallet: FC = ({}) => {
    return (
        <div className="wallet wrapper">
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
                    rows={[1, 2, 3].map(row)}
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
