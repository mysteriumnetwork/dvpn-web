import { tequilapiClient } from '../api'
import { NodeHealthcheck } from 'mysterium-vpn-js'
import { Issue } from 'mysterium-vpn-js/lib/feedback/issue'

export const healthCheck = async (): Promise<NodeHealthcheck> => {
  return await tequilapiClient.healthCheck()
}

export const sendReportIssue = async (value): Promise<any> => {
  const data: Issue = (value && value.toJS && value.toJS()) || value
  console.log('sendReportIssue: ', data)

  return tequilapiClient.reportIssue(data)
}
