/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import './BountyWidget.scss';

interface Props {}

const BountyWidget = (props: Props) => {
    return (
        <div className="bounty">
            <div className="bounty__header">
                <div className="bounty__header__title">Bounty pilot (May)</div>
            </div>

            <div className="bounty__body">
                <div className="bounty__body_row">
                    48.2224 MYST <span className="bounty__body__label">$48.22</span>
                </div>
                <hr />
                <div className="bounty__body_row">
                    Residential position: 8 <span className="bounty__body__label">out of 250</span>
                    <div>Eligible</div>
                </div>
                <hr />
                <div className="bounty__body_row">
                    Country possition: 1 <span className="bounty__body__label">out of 8</span>
                    <div>Eligible</div>
                </div>
            </div>
        </div>
    );
};

export default BountyWidget;
