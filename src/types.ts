import { BaseAction } from 'redux-actions'

export type DefaultProps = {
  form?: any
  history?: any
  language?: any
  location?: any
  match?: any
  router?: any
  staticContext?: any
}

export interface DispatchResult<T = any> extends BaseAction {
  value?: T
}

export interface ConfigData {
  'access-policy'?: { 'list'?: string }
  openvpn?: { 'port'?: number }
  shaper?: { enabled?: boolean }
}
