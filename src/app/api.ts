import { tequilapiClient } from '../api'
import { NodeHealthcheck } from 'mysterium-vpn-js'

export const healthCheck = async (): Promise<NodeHealthcheck> => {
  return await tequilapiClient.healthCheck()
}
