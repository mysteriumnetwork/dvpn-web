/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { myst } from '../commons/mysts'
import { addListener, PayloadAction } from '@reduxjs/toolkit'
import { FeesResponse } from 'mysterium-vpn-js'
import { store } from './store'
import { updateFeesStore, updateMinimumRegistrationAmountWeiStore } from './app.slice'

const FEE_SPIKE_MULTIPLIER = 1.5

const registerMinimumRegistrationAmountListener = () =>
  store.dispatch(
    addListener({
      actionCreator: updateFeesStore,
      effect: (action: PayloadAction<FeesResponse>, api) => {
        const {
          current: { registration },
        } = action.payload
        const minimumRegistrationAmountWei = myst.toBig(registration.wei).times(FEE_SPIKE_MULTIPLIER).toFixed()
        api.dispatch(updateMinimumRegistrationAmountWeiStore(minimumRegistrationAmountWei))
      },
    }),
  )

const listeners = {
  registerMinimumRegistrationAmountListener,
}

export default listeners
