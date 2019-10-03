import { tequilapiClient } from '../api'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'
import { Config } from 'mysterium-vpn-js/lib/config/config'

export const healthCheck = async (): Promise<NodeHealthcheck> => {
  return await tequilapiClient.healthCheck()
}

export const sendReportIssue = async (value): Promise<any> => {
  const data: Issue = (value && value.toJS && value.toJS()) || value
  // console.log('sendReportIssue: ', data)

  return tequilapiClient.reportIssue(data)
}

export const getUserConfig = async (): Promise<Config> => {
  return await tequilapiClient.userConfig()
}

export const updateUserConfig = async (data: any): Promise<void> => {
  console.log('setUserConfig: ', data)
  return await tequilapiClient.updateUserConfig({ data })
}
