/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const currency = 'MYST';

export default function formatCurrency(amount: number): string {
    const val = (amount / 100_000_000).toFixed(3);
    return `${val} ${currency}`;
}
