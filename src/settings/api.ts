import { tequilapiClient } from '../api'
import TequilapiError from 'mysterium-vpn-js/lib/tequilapi-error'
import { SubmissionError } from 'redux-form'

export const authChangePassword = async (data: { username: string, oldPassword: string, newPassword: string }): Promise<any> => {
  const { newPassword, oldPassword, username } = data
  try {
    await tequilapiClient.authChangePassword(username, oldPassword, newPassword)
  } catch (e) {
    throw new SubmissionError({
      _error: ((e as TequilapiError).isUnauthorizedError) ? 'Authorization failed!' : e.message
    })
  }
}

export const authLogin = async (data: { username: string, password: string }): Promise<any> => {
  const { password, username } = data
  try {
    await tequilapiClient.authLogin(username, password)
  } catch (e) {
    throw new SubmissionError({
      _error: ((e as TequilapiError).isUnauthorizedError) ? 'Authorization failed!' : e.message
    })
  }
}
