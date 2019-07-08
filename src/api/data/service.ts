//TODO: move to mysterium-vpn-js
export interface ServiceOptions {
  port?: number
  protocol?: string

  [key: string]: any
}

export enum ServiceTypes {
  OPENVPN = 'openvpn',
  WIREGUARD = 'wireguard',
  NOOP = 'noop'
}
