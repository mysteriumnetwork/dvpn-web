/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Fees } from 'mysterium-vpn-js'
import { AppState, currentIdentity, onboardingState } from './app.slice'
import { SSEState } from './sse.slice'
import { RootState } from './store'

export const currentIdentitySelector = ({ app, sse }: { app: AppState; sse: SSEState }) =>
  currentIdentity(app.currentIdentityRef, sse.appState?.identities)

export const onBoardingStateSelector = ({ app, sse }: { app: AppState; sse: SSEState }) =>
  onboardingState(app.auth, app.terms, currentIdentitySelector({ app, sse }))

export const feesSelector = ({ app }: RootState): Fees => {
  return app.fees
}
