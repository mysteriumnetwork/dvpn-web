/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';

import { ReactComponent as Chat } from '../../assets/images/authenticated/components/navigation/Chat.svg';

import ReportIssueModal from './ReportIssueModal';

interface StateProps {
    showModal: boolean;
}

const ReportIssue = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const onClose = () => {
        setShowModal(false);
    };

    return (
        <div>
            <IconButton onClick={() => setShowModal(true)}>
                <Chat />
            </IconButton>
            <ReportIssueModal onClose={onClose} open={showModal} />
        </div>
    );
};

export default ReportIssue;
