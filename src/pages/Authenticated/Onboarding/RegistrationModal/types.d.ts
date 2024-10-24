/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PaymentGateway } from 'mysterium-vpn-js'

export interface RegistrationStepProps {
  allGateways: PaymentGateway[]
  gateway: string
  selectGateway: (gw: string) => void
  beneficiary: string
  setBeneficiary: (beneficiary: string) => void
  next: () => void
  back: () => void
  loading: boolean
  setLoading: (b: boolean) => void
}
