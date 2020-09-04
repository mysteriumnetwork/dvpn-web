/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { MMNReportResponse } from 'mysterium-vpn-js';

import displayMyst from '../../../../commons/displayMyst';
import { displayUsd } from '../../../../commons/money.utils';

interface Props {
    mmn: {
        isLoading: boolean;
        reportResponse?: MMNReportResponse;
    };
    month: string;
    mystValue: string;
    earnings: string;
    residentialPosition: string;
    residentialPositionOf: string;
    countryPosition: string;
    countryPositionOf: string;
}

const MMNReportCard: React.FC<Props> = (props) => {
    const { reportResponse } = props.mmn;
    const earningTokens = reportResponse?.report?.earningTokens;
    const earningUsd = reportResponse?.report?.earningUsd;
    const { position, positionPerCountry } = { ...props.mmn.reportResponse?.report };
    return (
        <div className="dashboard--earnings-info">
            <p className="heading">Bounty pilot ({props.month})</p>
            <div className="info-row">
                <p className="statement">{displayMyst(earningTokens)}</p>
                <p className="statement-info">{displayUsd(earningUsd)}</p>
            </div>
            <div className="info-row">
                <p className="statement">
                    Residential position: {position} <span>Eligible</span>
                </p>
                <p className="statement-info">out of {props.residentialPositionOf}</p>
            </div>
            <div className="info-row">
                <p className="statement">
                    Country position: {positionPerCountry} <span>Eligible</span>
                </p>
                <p className="statement-info">out of {props.countryPositionOf}</p>
            </div>
            <div className="more-button">
                <div className="more-button--dot"></div>
                <div className="more-button--dot"></div>
                <div className="more-button--dot"></div>
            </div>
        </div>
    );
};

export default MMNReportCard;
