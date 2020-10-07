/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const isValidEthereumAddress = (address?: string): boolean => {
    if (address) {
        let match = address.match('^0x[0-9a-fA-F]{40}$');
        return match != null && match.length === 1;
    }

    return false;
};
