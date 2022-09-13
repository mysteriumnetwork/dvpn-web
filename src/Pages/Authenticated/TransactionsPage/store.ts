/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { tequila } from '../../../api/tequila'
import { Settlement } from 'mysterium-vpn-js'
import errors from '../../../commons/errors'

const { api } = tequila

export class TransactionsPageStore {
  page: number = 1
  transactions: Settlement[] = []
  loading: boolean = true
  totalPages: number = 1
  constructor() {
    makeObservable(this, {
      page: observable,
      transactions: observable,
      loading: observable,
      totalPages: observable,

      setTransactions: action,
      setLoading: action,
      setPage: action,
      setTotalPages: action,

      noData: computed,
    })
  }
  setupReactions(): void {
    reaction(
      () => this.page,
      () => this.fetchTransactions(),
    )
  }
  async fetchTransactions(): Promise<void> {
    this.setLoading()
    try {
      const data = await api.settlementHistory({ page: this.page })
      this.setTransactions(data.items)
      this.setTotalPages(data.totalPages)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    this.setLoading(false)
  }

  setPage(page: number): void {
    this.page = page
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages
  }

  setLoading(b: boolean = true): void {
    this.loading = b
  }

  setTransactions(transactions: Settlement[]): void {
    this.transactions = transactions
  }

  get noData(): boolean {
    return this.transactions.length === 0
  }
}
