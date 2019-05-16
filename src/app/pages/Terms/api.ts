import { HttpAdapter } from '../../../api/http'
import { TERMS_URL } from './constants'

export const fetchTerms = async (): Promise<string | null> => {
  try {
    const http = new HttpAdapter({
      baseURL: TERMS_URL,
    })
    return await http.get('')
  } catch (e) {
    console.error('Failed fetching first access policy', e)
  }
  return null
}
