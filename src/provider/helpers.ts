import { ProviderState } from './reducer'
import { NODE_TYPE } from '../constants'
import _ from 'lodash'

export const isResidentialProvider = (provider: ProviderState) => {
  return _.get(provider, 'originalLocation.node_type') === NODE_TYPE.RESIDENTIAL
}

export const isDataCenterProvider = (provider: ProviderState) => {
  return _.get(provider, 'originalLocation.node_type') === NODE_TYPE.DATA_CENTER
}
