/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { action, computed, makeObservable, observable } from 'mobx'
import { MetricsRange } from '../types/common'
import { SessionV2 } from 'mysterium-vpn-js'
import { tequila } from '../api/tequila'
import errors from '../commons/errors'

const { api } = tequila

const PAGE_SIZE = 10

export class SessionsStore {
  range: MetricsRange = '30d'
  page: number = 1
  totalPages: number = 1
  sessions: SessionV2[] = []
  loading: boolean = true

  constructor() {
    makeObservable(this, {
      range: observable,
      page: observable,
      totalPages: observable,
      sessions: observable,
      loading: observable,

      setLoading: action,
      setPage: action,
      setSessions: action,
      setTotalPages: action,

      pagedSessions: computed,
      noData: computed,
    })
  }

  async fetchSessions(): Promise<void> {
    this.setLoading()
    try {
      const { sessions } = await api.provider.sessions({ range: this.range })
      this.setTotalPages(Math.ceil(sessions.length / PAGE_SIZE))
      this.setSessions(sessions)
    } catch (err: any) {
      errors.parseToastError(err)
    }
    this.setLoading(false)
  }

  setPage(page: number): void {
    this.page = page
  }

  setLoading(b: boolean = true): void {
    this.loading = b
  }

  setSessions(sessions: SessionV2[]): void {
    this.sessions = sessions
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages
  }

  get pagedSessions(): SessionV2[] {
    return this.sessions.slice(PAGE_SIZE * (this.page - 1), PAGE_SIZE * this.page)
  }

  get noData(): boolean {
    return this.sessions.length === 0
  }
}
