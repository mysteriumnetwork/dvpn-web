/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from 'mysterium-vpn-js'
import _ from 'lodash'

export interface SSEState {
  appState?: AppState
}
const INITIAL_STATE: SSEState = {}

const slice = createSlice({
  name: 'sse',
  initialState: INITIAL_STATE,
  reducers: {
    sseAppStateStateChanged: (state, action) => {
      state.appState = action.payload
    },
  },
})

export const beneficiary = (sse: SSEState): string => {
  const firstChannel = _.head(sse.appState?.channels)

  if (firstChannel === null || firstChannel === undefined) {
    return 'N/A'
  }

  return firstChannel.beneficiary
}

export const { sseAppStateStateChanged } = slice.actions
export default slice.reducer
