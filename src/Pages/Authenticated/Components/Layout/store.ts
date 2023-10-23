/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { action, autorun, computed, makeObservable, observable } from 'mobx'
import { tequila } from '../../../../api/tequila'
import errors from '../../../../commons/errors'
import { StatusIndicatorVariants } from '../NodeStatus/NodeStatus'

const { api } = tequila

type QualityIndicatorVariants = 'good' | 'normal' | 'poor' | 'unknown'

export class HeaderStore {
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
    autorun(() => {
      this.fetchState()
    })
  }

  updateStateInterval() {
    return setInterval(() => this.fetchState(), 10 * 60 * 1000)
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
      console.log('status: ', status)

      this.setStatus(status)
      this.setQuality(quality)
    } catch (err: any) {
      errors.parseToastError(err)
    }
  }

  get resolveQualityVariant(): QualityIndicatorVariants {
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

  get resolveStatusVariant(): StatusIndicatorVariants {
    if (this.status === 'failed') {
      return 'monitoringFailed'
    }
    if (this.status === 'pending') {
      return 'pending'
    }
    return 'online'
  }
}
