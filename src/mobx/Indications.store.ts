/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { action, computed, makeObservable, observable } from 'mobx'
import { tequila } from '../api/tequila'
import errors from '../commons/errors'

const { api } = tequila

export type NodeQuality = 'good' | 'normal' | 'poor' | 'unknown'
export type NodeStatus = 'online' | 'offline' | 'monitoringFailed' | 'unknown' | 'pending'

export class IndicationsStore {
  status: string = 'pending'
  quality: number = 0
  loading: boolean = true

  constructor() {
    makeObservable(this, {
      status: observable,
      quality: observable,

      setStatus: action,
      setQuality: action,

      resolveQualityVariant: computed,
      resolveStatusVariant: computed,
    })
  }

  setupReactions(): void {
    setInterval(() => this.fetchState(), 60 * 1000)
    this.fetchState()
  }

  setStatus(status: string): void {
    this.status = status
  }

  setQuality(quality: number): void {
    this.quality = quality
  }

  async fetchState(): Promise<void> {
    try {
      const { status } = await api.nodeMonitoringStatus()
      const { quality } = await api.provider.quality()

      this.setStatus(status)
      this.setQuality(quality)
    } catch (err: any) {
      errors.parseToastError(err)
    }
  }

  get resolveQualityVariant(): NodeQuality {
    if (this.quality > 0.75) {
      return 'good'
    }
    if (this.quality < 0.75 && this.quality > 0.5) {
      return 'normal'
    }
    if (this.quality < 0.5) {
      return 'poor'
    }
    return 'normal'
  }

  get resolveStatusVariant(): NodeStatus {
    if (this.status === 'success') {
      return 'online'
    }

    if (this.status.toLowerCase().includes('failed')) {
      return 'monitoringFailed'
    }

    return 'pending'
  }
}
