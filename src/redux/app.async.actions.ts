/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Dispatch } from 'react'

import { tequila } from '../api/wrapped-calls'
import { DEFAULT_IDENTITY_PASSPHRASE } from '../constants/defaults'

import {
  updateChainSummaryStore,
  updateConfigStore,
  updateFeesStore,
  updateIdentityRefStore,
  updateTermsStore,
} from './app.slice'

const { api } = tequila

export const updateTermsStoreAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const terms = await api.terms()
    dispatch(
      updateTermsStore({
        acceptedVersion: terms.agreedVersion,
      }),
    )
  }
}

export const fetchIdentityAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const identityRef = await api.identityCurrent({ passphrase: DEFAULT_IDENTITY_PASSPHRASE })
    dispatch(updateIdentityRefStore(identityRef))

    await api.identityBalanceRefresh(identityRef.id)
  }
}

export const fetchConfigAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const config = await api.config()
    dispatch(updateConfigStore(config))
  }
}

export const fetchFeesAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const fees = await api.transactorFees()
    dispatch(updateFeesStore(fees))
  }
}

export const fetchChainSummaryAsync = (): ((dispatch: Dispatch<any>) => void) => {
  return async (dispatch) => {
    const chainSummary = await api.chainSummary()
    dispatch(updateChainSummaryStore(chainSummary))
  }
}
