import { HTTP_API_URL, HTTP_TIMEOUT_DEFAULT, HttpAdapter } from './http'
import { TequilaApi } from './tequila-api'

export const httpAdapter = new HttpAdapter({
  baseURL: HTTP_API_URL,
  timeout: HTTP_TIMEOUT_DEFAULT,
  headers: { 'Cache-Control': 'no-cache, no-store' }
})

export const tequilaApi = new TequilaApi(httpAdapter)
