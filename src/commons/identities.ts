/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Identity, IdentityRegistrationStatus } from 'mysterium-vpn-js'
import { IDENTITY_EMPTY } from '../constants/instances'

const { Registered, InProgress, Unregistered, RegistrationError } = IdentityRegistrationStatus

const isRegistered = (identity: Identity): boolean => {
  return identity.registrationStatus === Registered
}

const isInProgress = (identity: Identity): boolean => {
  return identity.registrationStatus === InProgress
}

const isUnregistered = (identity: Identity): boolean => {
  return identity.registrationStatus === Unregistered
}

const isRegistrationError = (identity: Identity): boolean => {
  return identity.registrationStatus === RegistrationError
}

const isEmpty = (identity: Identity | string): boolean => {
  if (typeof identity === 'string') {
    return identity === IDENTITY_EMPTY.id
  }
  return identity.id === IDENTITY_EMPTY.id
}

const hermesIds = (identity: Identity): string[] => {
  return Object.keys(identity.earningsPerHermes)
}

const identities = {
  hermesIds,
  isRegistered,
  isInProgress,
  isUnregistered,
  isRegistrationError,
  isEmpty,
}

export default identities
