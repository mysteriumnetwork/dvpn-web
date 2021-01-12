/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'react'

import { tequilapiClient } from '../api/TequilApiClient'
import { DEFAULT_IDENTITY_PASSPHRASE } from '../constants/defaults'

import {
  updateTermsStore,
  updateConfigStore,
  updateIdentityRefStore,
  updateIdentityStore,
  updateFeesStore,
  updateUserConfigStore,
} from './app.slice'

export const updateTermsStoreAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const terms = await tequilapiClient.terms()
    dispatch(
      updateTermsStore({
        acceptedVersion: terms.agreedVersion,
      }),
    )
  }
}

export const fetchIdentityAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const identityRef = await tequilapiClient.identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
    dispatch(updateIdentityRefStore(identityRef))

    const identity = await tequilapiClient.identity(identityRef.id)
    dispatch(updateIdentityStore(identity))
  }
}

export const fetchConfigAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const config = await tequilapiClient.config()
    dispatch(updateConfigStore(config))
  }
}

export const fetcUserConfigAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const config = await tequilapiClient.userConfig()
    dispatch(updateUserConfigStore(config))
  }
}

export const fetchFeesAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const config = await tequilapiClient.transactorFees()
    dispatch(updateFeesStore(config))
  }
}
