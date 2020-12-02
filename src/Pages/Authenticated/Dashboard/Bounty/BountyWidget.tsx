/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react';
import { tequilapiClient } from '../../../../api/TequilApiClient';
import { MMNReport } from 'mysterium-vpn-js';
import { CircularProgress } from '@material-ui/core';
import './BountyWidget.scss';

const BountyWidget = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [report, setReport] = useState<MMNReport>({} as MMNReport);

    useEffect(() => {
        setIsLoading(true);
        tequilapiClient
            .getMMNNodeReport()
            .then((response) => {
                setReport(response.report as MMNReport);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <CircularProgress className="spinner" />;
    }

    return (
        <div className="bounty">
            <div className="bounty__header">
                <div className="bounty__header__title">Bounty pilot</div>
            </div>

            <div className="bounty__body">
                <div className="bounty__body_row">
                    {report.earningTokens ?? '-'} MYST
                    <span className="bounty__body__label">${report.earningUsd ?? '-'}</span>
                </div>
                <hr />
                <div className="bounty__body_row">
                    Residential position: {report.position ?? '-'}
                    <span className="bounty__body__label">out of 250</span>
                    <div>Eligible</div>
                </div>
                <hr />
                <div className="bounty__body_row">
                    Country possition: {report.positionPerCountry ?? '-'}
                    <span className="bounty__body__label">out of 8</span>
                    <div>Eligible</div>
                </div>
            </div>
        </div>
    );
};

export default BountyWidget;
