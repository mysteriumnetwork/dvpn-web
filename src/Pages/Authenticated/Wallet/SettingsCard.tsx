/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactComponentElement } from 'react';
import { CircularProgress } from '@material-ui/core';

import './SettingsCards.scss';

import Button from '../../../Components/Buttons/Button';

interface Props {
    onEdit?: () => void;
    header?: string;
    contentHeader?: string;
    isContentLoading?: boolean;
    isButtonLoading?: boolean;
    content?: ReactComponentElement<any>;
}

const SettingsCard = ({
    onEdit,
    header,
    contentHeader,
    content,
    isContentLoading,
    isButtonLoading,
}: Props): JSX.Element => {
    return (
        <div className="wallet-sidebar__card">
            <div className="header">{header}</div>
            <div className="content">
                {isContentLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div className="content__header truncate">{contentHeader}</div>
                        <div className="content__subtext">{content}</div>
                        {onEdit && (
                            <div className="content__footer">
                                <Button isLoading={isButtonLoading} onClick={onEdit} className="button">
                                    <p>Edit</p>
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SettingsCard;
