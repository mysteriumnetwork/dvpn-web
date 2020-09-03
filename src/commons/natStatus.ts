/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const natStatus = (natStatus?: string): string => {
    switch (natStatus || '') {
        case 'not_finished':
            return 'Not Finished';
        case 'successful':
            return 'Success';
        case 'failed':
            return 'Failed';
        default:
            return 'Unknown';
    }
};

export const natStatusColor = (natStatus?: string): string => {
    switch (natStatus || '') {
        case 'not_finished':
            return 'warning';
        case 'successful':
            return 'success';
        case 'failed':
            return 'failed';
        default:
            return 'warning';
    }
};
