/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { store } from '../redux/store'
import murmurhash from 'murmurhash'

export type MNEventSenderConfig = {
  readonly url: string
  readonly bucket: string
  readonly logLevel?: 'silent' | 'verbose'
}

export type NodeUIMNEvent = {
  readonly type: string
  readonly data: {
    readonly sid: number
  }
}

export class MNEventSender {
  private readonly url: string
  private readonly bucket: string
  private readonly logLevel: 'silent' | 'verbose'

  constructor(config: MNEventSenderConfig) {
    this.url = config.url
    this.bucket = config.bucket
    this.logLevel = config.logLevel ?? 'silent'
  }

  public async send(type: string, data?: object): Promise<void> {
    const id = store.getState().app.currentIdentityRef?.id.toLowerCase()

    const e: NodeUIMNEvent = {
      type,
      data: {
        ...data,
        sid: id ? murmurhash.v3(id, 0) : -1,
      },
    }
    const body = JSON.stringify(e)
    try {
      await fetch(`${this.url}/api/v1/events/${this.bucket}`, {
        method: 'POST',
        body,
      })
    } catch (e) {
      if (this.logLevel === 'verbose') {
        console.error(`Failed to send event`, body, e)
      }
    }
  }
}

export const events = new MNEventSender({
  url: 'https://events.mysterium.network',
  bucket: 'node_ui',
})
