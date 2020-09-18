/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { FC, ReactComponentElement } from 'react';
import { CircularProgress } from '@material-ui/core';

import './SettingsCards.scss';

import LoadingButton from '../../../Components/Buttons/LoadingButton';

interface Props {
    onEdit?: () => void;
    header?: string;
    contentHeader?: string;
    isLoading?: boolean;
    content?: ReactComponentElement<any>;
}

const SettingsCard: FC<Props> = ({ onEdit, header, contentHeader, content, isLoading }) => {
    return (
        <div className="wallet-sidebar__card">
            <div className="header">{header}</div>
            <div className="content">
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="content__header truncate">{contentHeader}</div>
                        <div className="content__subtext">{content}</div>
                        <div className="content__footer">
                            <LoadingButton onClick={onEdit} className="button">
                                <p>Edit</p>
                            </LoadingButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SettingsCard;
