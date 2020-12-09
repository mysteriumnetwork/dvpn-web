/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const date2human = (ds: string): string => {
    return new Date(Date.parse(ds)).toLocaleString();
};

export const seconds2ISOTime = (seconds: number): string => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
};
