/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Agreement {
  at?: string
  version?: string
}

export const resolveTermsAgreement = (configData?: any): Agreement => {
  return configData?.mysteriumwebui?.termsAgreed || {}
}
