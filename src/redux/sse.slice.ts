/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createSlice } from '@reduxjs/toolkit'
import { AppState } from 'mysterium-vpn-js'
import _ from 'lodash'
import { ConnectionStatus, NatStatus } from 'mysterium-vpn-js'
import { TOKENS_EMPTY } from '../constants/instances'

export interface SSEState {
  appState: AppState
}

const INITIAL_STATE: SSEState = {
  appState: {
    natStatus: {
      status: NatStatus.NOT_FINISHED,
    },
    serviceInfo: [],
    sessions: [],
    sessionsStats: {
      count: 0,
      countConsumers: 0,
      sumBytesReceived: 0,
      sumBytesSent: 0,
      sumDuration: 0,
      sumTokens: 0,
    },
    consumer: {
      connection: {
        status: ConnectionStatus.NOT_CONNECTED,
        statistics: {
          bytesReceived: 0,
          bytesSent: 0,
          throughputSent: 0,
          throughputReceived: 0,
          duration: 0,
          tokensSpent: 0,
          spentTokens: TOKENS_EMPTY,
        },
      },
    },
    identities: [],
    channels: [],
  },
}

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
