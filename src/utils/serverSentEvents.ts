import { EventEmitter } from 'events'
import { getHttpApiUrl } from '../constants'
import { Middleware, MiddlewareAPI } from 'redux'
import { Action, ActionFunctionAny, createAction } from 'redux-actions'
import { NatStatus, ServiceInfo, ServiceSession } from 'mysterium-vpn-js'

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

export const SSE_ACTION = 'SERVER_SENT_EVENTS'

export class ServerSentEvents extends EventEmitter {

  protected evtSource: EventSource
  protected middlewareAPI: MiddlewareAPI
  protected readonly action: ActionFunctionAny<Action<ServerSentPayload>>

  constructor(public readonly url, public readonly withCredentials: boolean = false) {
    super()

    if (ServerSentEvents.SUPPORTED) {
      this.connect()
    }

    this.action = createAction(SSE_ACTION)
  }

  static get SUPPORTED() {
    return Boolean(EventSource)
  }

  get state(): ServerSentState {
    return this.evtSource ? this.evtSource.readyState as ServerSentState : ServerSentState.CLOSED
  }

  subscribe(cb: (payload: ServerSentPayload) => void) {
    this.on('data', cb)
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
    console.warn('[ServerSentEvents]' + event)
    this.emit('error', event)
  }

  protected onMessage = (event) => {
    let payload: ServerSentPayload = (typeof event.data === 'string') ? JSON.parse(event.data) : event.data
    console.log('[ServerSentEvents] message!', payload)

    ///TODO: maybe should be fixes server data
    payload = ((payload as any).payload) || payload
    this.emit('data', payload)

    if (this.middlewareAPI) {
      this.middlewareAPI.dispatch(this.action(payload))
    }
  }

  protected onOpen = (event) => {
    console.log('[ServerSentEvents] connected!')
    this.emit('open', event)
  }
}

export default new ServerSentEvents(`${getHttpApiUrl()}/events`)
