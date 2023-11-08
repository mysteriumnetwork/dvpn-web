/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { makeAutoObservable } from 'mobx'
import { tequila } from '../../../../../api/tequila'
import errors from '../../../../../commons/errors'
import { store } from '../../../../../redux/store'
const { api } = tequila

export class AsyncBeneficiaryStore {
  loading = true
  address = ''
  error = ''
  showChangeModal = false

  constructor() {
    makeAutoObservable(this)
  }

  public setLoading(b = true) {
    this.loading = b
  }

  public setAddress(address: string) {
    this.address = address
  }

  public setShowChangeModal(b = true) {
    this.showChangeModal = b
    this.error = ''
  }

  public async fetchBeneficiaryAsyncAddress(identity: string) {
    this.setLoading(true)
    this.error = ''
    try {
      // load up beneficiary from blockchain (legacy)
      const { beneficiary, isChannelAddress } = store.getState().app.beneficiary
      const resp = await api.payment.getBeneficiaryAsync(identity)

      // resolve between new and legacy methods (backwards compatibility layer)
      this.address = resp.address ? resp.address : isChannelAddress ? '' : beneficiary
    } catch (e) {
      errors.parseToastError(e)
    }
    this.setLoading(false)
  }

  public async updateBeneficiaryAsyncAddress(change: { identity: string; address: string }) {
    this.setLoading()
    this.error = ''
    try {
      const resp = await api.payment.changeBeneficiaryAsync(change)
      this.address = resp.address
    } catch (e: unknown) {
      errors.parseToastError(e)
      this.error = 'Invalid wallet address format'
      throw e
    } finally {
      this.setLoading(false)
    }
  }
}
