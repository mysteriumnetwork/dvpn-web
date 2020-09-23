/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const date2iso = (ds: string): string => {
    return new Date(Date.parse(ds)).toISOString();
};
