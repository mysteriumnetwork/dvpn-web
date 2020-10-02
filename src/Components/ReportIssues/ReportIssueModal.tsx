/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue';
import { useSnackbar } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';

import { DefaultTextField } from '../DefaultTextField';
import Button from '../Buttons/Button';
import { tequilapiClient } from '../../api/TequilApiClient';
import { parseError } from '../../commons/error.utils';

import './ReportIssueModal.scss';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface StateProps extends Issue {
    sending: boolean;
}

const ReportIssueModal = ({ open, onClose }: Props) => {
    const [state, setState] = useState<StateProps>({
        description: '',
        email: '',
        sending: false,
    });

    const { enqueueSnackbar } = useSnackbar();

    const handleTextFieldsChange = (prop: keyof StateProps) => (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const resetState = () => {
        setState({ ...state, description: '', email: '', sending: false });
    };

    const handleClose = () => {
        onClose();
        resetState();
    };

    const reportIssue = () => {
        Promise.resolve(setState({ ...state, sending: true }))
            .then(() => tequilapiClient.reportIssue(state, 60000))
            .catch((err) => {
                enqueueSnackbar(parseError(err), { variant: 'error' });
            })
            .finally(() => {
                handleClose();
            });
    };

    return (
        <Dialog disableBackdropClick fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>
                <div className="report-issue__header">
                    <span>Report issue</span>
                    <div className="flex-grow" />
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="report-issue">
                    <div>
                        <DefaultTextField
                            placeholder="Describe what went wrong (minimum 30 characters)"
                            handleChange={handleTextFieldsChange}
                            value={state.description}
                            stateName="description"
                            rows={4}
                            multiline
                        />
                        <DefaultTextField
                            placeholder="Your Email (optional)"
                            handleChange={handleTextFieldsChange}
                            value={state.email || ''}
                            stateName="email"
                        />
                    </div>
                    <div className="report-issue__footer">
                        <Button
                            disabled={state.description.length < 30}
                            isLoading={state.sending}
                            onClick={reportIssue}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReportIssueModal;
