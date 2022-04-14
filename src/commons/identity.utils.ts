/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js'
import { IDENTITY_EMPTY } from '../constants/instances'
const { Registered, InProgress, Unregistered, RegistrationError } = IdentityRegistrationStatus

export const isRegistered = (identity: Identity): boolean => {
  return identity.registrationStatus === Registered
}

export const isInProgress = (identity: Identity): boolean => {
  return identity.registrationStatus === InProgress
}

export const isUnregistered = (identity: Identity): boolean => {
  return identity.registrationStatus === Unregistered
}

export const isRegistrationError = (identity: Identity): boolean => {
  return identity.registrationStatus === RegistrationError
}

export const isEmpty = (identity: Identity): boolean => {
  return identity.id === IDENTITY_EMPTY.id
}
