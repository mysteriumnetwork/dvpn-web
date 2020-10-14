/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { copy2clipboard } from '../../commons/clipboard.utils';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '../IconButton/IconButton';

interface Props {
    text: string;
}

const CopyToClipboard = ({ text }: Props) => {
    return (
        <IconButton
            onClick={() => {
                copy2clipboard(text);
            }}
        >
            <FileCopyIcon fontSize="small" />
        </IconButton>
    );
};

export default CopyToClipboard;
