import { tequilapiClient } from '../api'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'
import { Config } from 'mysterium-vpn-js/lib/config/config'

export const healthCheck = async (): Promise<NodeHealthcheck> => {
  return await tequilapiClient.healthCheck()
}

export const sendReportIssue = async (value): Promise<any> => {
  const data: Issue = (value && value.toJS && value.toJS()) || value

  return tequilapiClient.reportIssue(data, 60000)
}

export const getDefaultConfig = async (): Promise<Config> => {
  return await tequilapiClient.defaultConfig()
}

export const getUserConfig = async (): Promise<Config> => {
  return await tequilapiClient.userConfig()
}

export const updateUserConfig = async (data: any): Promise<Config> => {
  return await tequilapiClient.updateUserConfig({ data })
}
