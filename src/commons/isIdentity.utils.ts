/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js';
const { Registered, InProgress } = IdentityRegistrationStatus;

export const isIdentityRegistered = (identity: Identity): boolean => {
    return identity.registrationStatus === Registered;
};

export const isIdentityRegistrationInProgress = (identity: Identity): boolean => {
    return identity.registrationStatus === InProgress;
};
