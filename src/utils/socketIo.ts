import _ from 'lodash'
import { getHttpApiUrl } from '../constants'
import { EventEmitter } from 'events'

interface Options {reconnect: number}

class WebsocketClient extends EventEmitter {
  protected endpoint: string
  private ws: any
  private pending: boolean
  private connected: boolean
  private storeApi: any
  private reconnect: any
  private options: Options

  constructor(endpoint: string, options: Options) {
    super()
    this.endpoint = endpoint.replace('https', 'wss').replace('http', 'ws')
    this.ws = null
    this.pending = false
    this.connected = false
    this.storeApi = null
    this.options = options
    this.reconnect = _.debounce(this.connect, 2000, { maxWait: 2000 })
  }

  onError = (err) => {
    if (this.pending) {
      this.pending = false
      this.connected = false
      if (this.options && this.options.reconnect > 0) {
        console.log('[Websocket] trying reconnect ...')
        this.options.reconnect--
        this.reconnect()
      }
    }
    console.warn('[Websocket] lifetime error:' + err)
  }
  onOpen = () => {
    this.pending = false
    this.connected = true
    console.log('[Websocket] connected')
  }
  onClose = () => {
    this.pending = false
    this.connected = false
    this.ws = undefined
    console.log('[Websocket] closed')
    if (this.options && this.options.reconnect > 0) {
      console.log('[Websocket] trying reconnect ...')
      this.options.reconnect--
      this.reconnect()
    }
  }
  onMessage = (s) => {
    let action
    try {
      action = JSON.parse(s.data)
    } catch (err) {
      console.warn('[Websocket] parse incoming message error:', err)
      return
    }
    this.storeApi.dispatch(action)
    this.emit(action.type, action.payload, { store: this.storeApi, action })
  }

  middleware() {
    return storeAPI => {
      this.storeApi = storeAPI
      return next => action => {
        if (action.type === 'SEND_WEBSOCKET_MESSAGE') {
          this.send(action.payload)
          return
        }
        return next(action)
      }
    }
  }

  connect() {
    if (this.ws != null) {
      return this.ws
    }

    this.ws = new WebSocket(this.endpoint)
    this.pending = true
    this.ws.onerror = this.onError
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose

  }

  send(payload) {
    if (this.connect) {
      return
    }
    this.ws.send(JSON.stringify(payload))
  }
}

const websocketClient = new WebsocketClient(`${getHttpApiUrl()}/ws/`, {
  reconnect: Infinity
})
websocketClient.connect()
export default websocketClient
