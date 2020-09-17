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
        <div className="settings-card">
            <div className="settings-card__header">{header}</div>
            <div className="settings-card__content">
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="settings-card__content__header">{contentHeader}</div>
                        <div className="settings-card__content__subtext">{content}</div>
                        <div className="settings-card__content__footer">
                            <LoadingButton onClick={onEdit}>
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
