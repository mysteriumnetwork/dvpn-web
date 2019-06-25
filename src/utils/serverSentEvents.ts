import { EventEmitter } from 'events'
import { getHttpApiUrl } from '../constants'
import { Middleware, MiddlewareAPI } from 'redux'
import { createAction } from 'redux-actions'
import { NatStatus, ServiceInfo, ServiceSession } from 'mysterium-vpn-js'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'

const EventSource = NativeEventSource || EventSourcePolyfill

export enum ServerSentState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2
}

export interface ServerSentPayload {
  natStatus?: NatStatus
  serviceInfo?: ServiceInfo[]
  sessions?: ServiceSession[]
}

export interface ServerSentResponse {
  payload: ServerSentPayload,
  type: string
}

export enum ServerSentEventTypes {
  STATE_CHANGE = 'state-change'
}

export class ServerSentEvents extends EventEmitter {

  protected evtSource: EventSource
  protected middlewareAPI: MiddlewareAPI

  constructor(public readonly url, public readonly withCredentials: boolean = false) {
    super()

    if (ServerSentEvents.SUPPORTED) {
      this.connect()
    }
  }

  static get SUPPORTED() {
    return Boolean(EventSource)
  }

  get state(): ServerSentState {
    return this.evtSource ? this.evtSource.readyState as ServerSentState : ServerSentState.CLOSED
  }

  subscribe(type: ServerSentEventTypes, cb: (payload: ServerSentPayload) => void) {
    this.on(type, cb)
  }

  get middleware(): Middleware {
    return (api) => {
      this.middlewareAPI = api
      return next => next
    }
  }

  protected connect() {
    try {
      this.evtSource = new EventSource(this.url, { withCredentials: this.withCredentials })
      this.evtSource.onerror = this.onError
      this.evtSource.onopen = this.onOpen
      this.evtSource.onmessage = this.onMessage
    } catch (e) {
      this.onError(e)
    }
  }

  protected onError = (event) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[ServerSentEvents]', event)
    }

    try {
      this.emit('error', 'Connection failed!')
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ServerSentEvents] Exception:', e)
      }
    }
  }

  protected onMessage = (event) => {
    try {
      const { payload, type }: ServerSentResponse = (typeof event.data === 'string')
        ? JSON.parse(event.data)
        : event.data
      if (process.env.NODE_ENV !== 'production') {
        console.log('[ServerSentEvents] message!', type, payload)
      }
      this.emit(type, payload)

      if (this.middlewareAPI) {
        const action = createAction(`sse/${type}`)
        this.middlewareAPI.dispatch(action(payload))
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[ServerSentEvents] Exception:', e)
      }
    }
  }

  protected onOpen = (event) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[ServerSentEvents] connected!')
    }
    this.emit('open', event)
  }
}

export default new ServerSentEvents(`${getHttpApiUrl()}/events/state`)
