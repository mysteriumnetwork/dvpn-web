/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { MetricsRange, Option } from '../../../types/common'
import { SessionV2 } from 'mysterium-vpn-js'
import { tequila } from '../../../api/tequila'
import errors from '../../../commons/errors'

const { api } = tequila

const RANGE_OPTIONS: Option<MetricsRange>[] = [
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
]

const PAGE_SIZE = 10

export class HistoryPageStore {
  range: Option<MetricsRange> = RANGE_OPTIONS[0]
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
      setRange: action,
      setPage: action,
      setSessions: action,
      setTotalPages: action,

      pagedSessions: computed,
      noData: computed,
    })
  }

  setupReactions(): void {
    reaction(
      () => this.range,
      () => this.fetchSessions(),
      { fireImmediately: true },
    )
  }

  setRange(range: Option<MetricsRange>) {
    this.range = range
    this.setPage(1)
  }

  async fetchSessions(): Promise<void> {
    this.setLoading()
    try {
      const { sessions } = await api.provider.sessions({ range: this.range.value })
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

  get rangeOptions() {
    return RANGE_OPTIONS
  }

  get pagedSessions(): SessionV2[] {
    return this.sessions.slice(PAGE_SIZE * (this.page - 1), PAGE_SIZE * this.page)
  }

  get noData(): boolean {
    return this.sessions.length === 0
  }
}
