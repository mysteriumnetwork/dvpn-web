/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '../Buttons/Button';

interface Props {
    open?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
    message?: string;
}

const ConfirmationDialogue = ({ open = false, onCancel, onConfirm, message = 'Are you sure?' }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} extraStyle="gray">
                    Cancel
                </Button>
                <Button onClick={onConfirm} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialogue;
